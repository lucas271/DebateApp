import { Button, InputLabel, MenuItem, Paper, Select, TextField, TextareaAutosize } from "@mui/material";

export default function CreateTopic(){
    const topics = ['politics', 'people', 'outdoors', 'daily life']

    return <section className="w-full p-1">
        <h2 className="text-lg text-slate-400 font-semibold mb-4">
            Create new topic
        </h2>
        <form>
            <Paper className="p-4 flex flex-col gap-6">
                <div className="flex gap-4 flex-wrap flex-col lg:flex-row">
                    <div className="flex-grow">
                        <InputLabel id="topic_title" >Subject</InputLabel>
                        <TextField fullWidth id="topic_title" placeholder="Place your Title here"/>
                    </div>
                    <div className="flex-grow">
                        <InputLabel id="topic_choice">Topics</InputLabel>

                        <Select
                            labelId="topic_choice"
                            fullWidth        
                        >
                            {
                                topics.map(topic => {
                                    return <MenuItem value={topic}>{topic}</MenuItem>
                                })
                            }
                        </Select>
                    </div>
                </div>
                <div>
                    <InputLabel id="topic_choice">Text</InputLabel>
                    <TextField rows={6} multiline className="w-full" placeholder="Place your text here.."/>
                </div>
            </Paper>
            <div className="mt-6 cursor-pointer">
                <Button variant="contained" type="submit">Post the topic</Button>

            </div>
        </form>
    </section>
}