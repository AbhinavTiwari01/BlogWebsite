import {Box, Typography, styled} from '@mui/material';

import {Edit, Delete} from '@mui/icons-material';

import {API} from '../../services/api';

import {useEffect, useState, useContext} from 'react';
 
import {useParams, Link, useNavigate} from 'react-router-dom'

import {DataContext} from '../../Context/DataProvider';

import Comments from './Comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width : '100%',
    height : '80vh',
    objectFit : 'cover',
})

const Heading = styled(Typography)`
   font-size : 38px;
   font-weight : 600;
   text-align: center;
   margin: 50px 0 10px 0;
   word-break : break-word;

`

const EditIcon = styled(Edit)`
    margin : 5px;
    padding : 5px;
    border : 1px solid #878787;
    border-radius : 10px;
`;
const DeleteIcon = styled(Delete)`
    margin : 5px;
    padding : 5px;
    border : 1px solid #878787;
    border-radius : 10px;
`;

const Author = styled(Box)`
    color : #878787;
    margin : 20px 10px;
    display : flex
`;

const Description  = styled(Typography)`
   word-break : break-word;
`

const DetailView = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const {account} = useContext(DataContext);

    const [post, setPost] = useState([]);

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const fetchData = async() => {
        let response  = await API.getPostById(id);
        if(response.isSuccess){
            setPost(response.data);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    const deleteBlog = async() => {
        let response = await API.deletePost(post._id);
        if(response.isSuccess){
            navigate('/');
        }
    }

  return (
    <Container>
        <Image src ={url} alt='blog'/>

        <Box style={{float : 'right'}}>
            {

                account.username === post.username && 
                <>
                <Link to ={`/update/${post._id}`}><EditIcon color='primary'/></Link>
                <DeleteIcon color ='error' onClick={()=> deleteBlog()}/> 
                </>
           } 
        </Box>

        <Heading>{post.title}</Heading>

        <Author>
            <Typography>Author : <Box component='span' style={{fontWeight: 700}}/>{post.username}</Typography>
            <Typography style={{marginLeft : 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
        </Author>

        <Description>{post.description}</Description>

        <Comments post={post}/>
    </Container>
  )
}

export default DetailView