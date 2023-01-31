const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv')





dotenv.config();




const configuration = new Configuration({
    organization: "org-P3aQiSJ5zYmczJ5LbBRDgTsL",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const ai_index = ('/', async (req, res) => { //you can decide to create a new controller to hanle the index without passing through the chatGpt server
    try {
        
        const response = await openai.listEngines();
        const models = response.data.data;
    //    console.log(response.data)

        res.render('index', {title: 'Your Coding AI', models});
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});



const ai_post = ('/', (req, res) => {
    const prompt = req.body.prompt;
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
    }).then(response => { 
      res.status(200).send({ 
          bot: response.data.choices[0].text 
      }) 
    }).catch(error => { 
      console.log(error); 
      res.status(500).send({ error }) 
    });  
  });

  module.exports = {
      ai_index,
      ai_post
  };