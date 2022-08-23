import {Box, TextareaAutosize, Button, styled} from '@mui/material';

import {useState, useContext, useEffect} from 'react';

import {DataContext} from '../../../Context/DataProvider';

import {API} from '../../../services/api'

import Comment from './Comment';

const Container = styled(Box)`
    margin-top : 100px;
    display : flex;
`;

const Image= styled('img')({
  width : 50,
  height : 50,
  borderRadius : '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
      height : 100px;
      width : 100%;
      margin : 0 20px;
`;

const initialValues = {
  name: '',
  postId : '',
  comments: '',
  date : new Date()
}

const Comments = ({post}) => {

  const [commentValue, setCommentValue] = useState(initialValues);

  const[allComments, setAllComments] = useState([])

  const [toggle, setToggle] = useState(false);

  const url = 'https://static.thenounproject.com/png/12017-200.png';

  const {account} = useContext(DataContext);

  useEffect(()=> {

    const getData = async() => {
      let response  = await API.getAllComments(post._id);
      if(response.isSuccess){
        setAllComments(response.data);
      }
    }

    getData();

  }, [post, toggle])

  const handleChange = (e) => {
    setCommentValue({
      ...commentValue,
      name: account.username,
      postId : post._id,
      comments : e.target.value
    })
  }

  const addComment = async() => {

    let response = await API.newComment(commentValue);
    if (response.isSuccess){
      setCommentValue(initialValues);
    }
    setToggle(prevState => !prevState);

  }

  return (
  
    <Box>
      <Container>
        <Image src= {url} alt ='dp'/>

        <StyledTextArea
        minRows = {5}
        placeholder= "Leave your comment here"
        value= {commentValue.comments}
        onChange={(e)=> handleChange(e)}
        />
        <Button variant='contained' size= 'medium' height='40px' onClick={() => addComment()}>Post</Button>

      </Container>

      <Box>

        {
          
          allComments && allComments.length> 0 && allComments.map(comment => (

            <Comment comment= {comment} setToggle = {setToggle}/>

          ))

        }

      </Box>
    </Box>

  )
}

export default Comments