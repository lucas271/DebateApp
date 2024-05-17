import { Button, TextField } from "@mui/material";
import MessageContainer from "../components/shared/MessageContainer";

export default function Topic(){

    return <>
        <MessageContainer/>
        <form className="my-6 flex flex-col gap-6">
            <TextField rows={6} multiline className="w-full bg-cyan-700" placeholder="Place your text here.."/>
            <Button variant="contained" className="w-fit">Send</Button>
        </form>
    </>
}