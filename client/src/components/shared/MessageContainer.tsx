import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { date } from "zod";
import ModeIcon from '@mui/icons-material/Mode';

export default function MessageContainer(){
    const messages = [
        {            
            messageTitle: "THE WOrld now",
            message: 'this message is asking you something',
            numberOfMessage: 0,
            messagerName: "claudio",
            timePublished: new Date(Date.now()).getDate(),
            publishedFlag: "BR",
            id: 1,
            updated: null
        } // the ideia in the future is that you are able to have new topics inside other topics, so i organized the DB structure like that.
    ]
    return <>
        <div>
        {messages.map(message => {
                    return <>
                        <Card sx={{ minWidth: 275 }} component={"div"} className="relative"  key={message.id}>
                            <div className=" hidden" id={String(message.numberOfMessage)}></div>
                            <header className="flex flex-wrap p-3 w-full justify-between items-center bg-blue-950">
                                {message.messagerName ? 
                                    <div className=" font-semibold text-lg text-slate-400">{message.messageTitle}</div>
                                    : 
                                    <div>
                                        <Link to={"#"+String(message.numberOfMessage)} className="text-gray-400 hover:text-gray-600 transition-all"> {message.numberOfMessage} </Link>
                                    </div>
                                }
                                <div className="text-white">
                                    <span>{message.publishedFlag} </span>
                                    {message.messagerName}
                                </div>

                            </header>
                            <CardContent className=" text-white border-y-2 bg-blue-800 border-slate-500 w-full overflow-hidden">
                                <p className="text-wrap overflow-auto break-words max-h-[65vh]">
                                    {message.message}
                                </p>
                            </CardContent>
                            <CardActions className="d-flex justify-between text-white bg-blue-800 p-3 w-full flex-wrap">
                                <div className="text-slate-400">{message.updated ? 
                                    <>
                                        <ModeIcon/>
                                        {message.updated}
                                    </>: 
                                    <>
                                        {message.timePublished}
                                    </>}  
                                </div>
                                <Button className="text-blue-950 font-bold">reply</Button>
                            </CardActions>
                        </Card>
                    </>
                })}

        </div>
    </>
}