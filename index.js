//importi fi express
const express =require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
// Load environment variables from .env file
dotenv.config();
//nasn3ou app express
const app = express()


const port = process.env.PORT
mongoose.connect('mongodb+srv://siwargares147:qQ54KvGkszx3Um17@to-do-db.vrbpp.mongodb.net/')
.then(() =>console.log("✅yes DB connected sucsessfuly✅"))
.catch(error =>console.log("⛔no DB is not connected yet⛔",error))

app.listen(port, () => console.log(`server running on port: ${port}`))

app.use(express.json())
app.get('/',(req,res)=>
    {
        console.log(req)
        res.send("welcome in our application")
    }
    )


    const taskSchema = new mongoose.Schema({
        name: { type: String, required: true },
        completed: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      });
    
      
      const Task = mongoose.model('Task', taskSchema);

    module.exports = Task;

   app.post('/tasks', async (req, res) => {
    try {
      console.log(req.body)
        // Créer une nouvelle tâche uniquement avec le champ `name`
        const task = await Task.create({
         
            name: req.body.name, // `completed` n'est pas inclus, il sera défini à `false` par défaut
        });

        // Répondre avec un message de succès et les détails de la tâche créée
        res.status(200).json({
            message: "Task created successfully",
            task: task
        });

    } catch (err) {
        // Gérer les erreurs (par exemple, champ `name` manquant)
        res.status(400).json({ error: err.message });
    }
    
});




  

      app.get('/tasks/:id', async (req, res) => {
        try {
          const task = await Task.findById(req.params.id);
          if (!task) return res.status(404).json({ error: 'Task not found' });
          res.json(task);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      });

      app.delete('/tasks/:id', async (req, res) => {
        try {
          const task = await Task.findByIdAndDelete(req.params.id);
          if (!task) return res.status(404).json({ error: 'Task not found' });
          res.json({ message: 'Task deleted successfully' });
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      });
      app.patch('/tasks/:id/completed', async (req, res) => {
        try {
          const task = await Task.findById(req.params.id);
          
          if (!task) {
            return res.status(404).json({ error: 'Task not found' });
          }
      
          // Toggle de l'état `completed`
          task.completed = !task.completed;
      
          // Sauvegarder les modifications
          await task.save();
      
          res.status(200).json({
            message: "Task status updated successfully",
            task: task
          });
      
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      });
      
      
