import * as React from 'react';
import { Button, Typography, Container, Box } from "@mui/material";
import Logo from "../components/Logo";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

//////////////////////////////////////

const Home = ({ setAuth }) => {
  
  const [value, setValue] = React.useState(0);
  const [categories, setCategories] = React.useState([]);
  const [joke, setJoke] = React.useState({});

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let BASE_URL = 'https://api.chucknorris.io/jokes'

//   to get all categories
  const getCategories = () => {
    const options = {method: 'GET', url: `${BASE_URL}/categories`};

    axios.request(options).then(function (response) {
        console.log(response.data);
        setCategories(response.data)
        return response.data
      }).catch(function (error) {
        console.error(error);
        return []
      });
  }

  // to get random joke

  const getRandomJoke = () => {
    const options = {method: 'GET', url: `${BASE_URL}/random`};

    axios.request(options).then(function (response) {
        console.log(response.data);
        setJoke(response.data)
        return response.data
      }).catch(function (error) {
        console.error(error);
        return []
      });
  }

  // get category joke

  const getJoke = (category) => {
    const options = {
        method: 'GET',
        url: `${BASE_URL}/random`,
        params: {category: category}
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
        setJoke(response.data)
        return response.data
      }).catch(function (error) {
        console.error(error);
        return []
      });
  }

  // when the app mounts


  React.useEffect(() => {
   getCategories()
   getRandomJoke()
  }, []);

  // when tab changes
  React.useEffect(() => {
    // get category at a clicked tab
    handleNext()
  }, [value]);

  // when next button is clicked, check category or get random

  const handleNext = () => {
    // alert(value)
    // current tab is value
    if(value > 0){
        //  means a special category is active
        let categoryIndex = value - 1
        let category = categories[categoryIndex]
        getJoke(category)

    }else{
        //  no special category, get random joke
        getRandomJoke()
    }

  }
  
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ mb: 5}}>
        <Logo />
      </Box>

      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Random Joke"/>
        {categories.map(data =><Tab label={data} />)}

      </Tabs>

      <Card sx={{ width: '100%', margin: '20px' }}>
      <CardMedia
        component="img"
        height="140"
        image={joke.icon_url}
        alt="Joke Icon/Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Chuck Norris Facts ;)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {joke.value}
        </Typography>
      </CardContent>
      <CardActions>
        <Button  size="small" onClick={()=> handleNext()}>Next Fact</Button>
      
      </CardActions>
    </Card>


    </Box>

      

      <Button  variant="contained" onClick={() => setAuth(false)}>
        Log out
      </Button>
    </Container>
  );
};


export default Home;
