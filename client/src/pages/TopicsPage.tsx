import { Container, Divider, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Title } from "@mui/icons-material";
import RelevantNews from "../components/shared/RelevantNews";

export default function TopicsPage(){

    return <>
        <section>
            <div className="w-full mb-12">
                <RelevantNews/>

            </div>
            <div className="flex flex-col gap-8">
                <List component="ul"
                className="flex flex-col gap-4 border-2"
                subheader={
                    <header  className='flex items-center px-2  py-1 bg-blue-950 text-white gap-2'>
                        <ListItemText primary="Rules"/>
                        <Divider/>
                    </header>
                }
                >   
                    <ListItem className="flex-wrap gap-2">
                        <h3 className="w-full text-xl font-semibold"> Dont't insult others </h3>
                        <Container component="blockquote">
                            <ListItemText className=" list-item list-disc">
                                Mocking, bullying, offending, racism, etc.
                            </ListItemText>
                        </Container>
                    </ListItem>
                    <ListItem className="flex-wrap gap-2">
                        <h3 className="w-full text-xl font-semibold"> Dont't troll</h3>
                        <Container component="blockquote">
                            <ListItemText className=" list-item list-disc">
                                Useless blogs, threads and posts, irrelevant posts, baiting etc.

                            </ListItemText>
                        </Container>
                    </ListItem>
                    <ListItem className="flex-wrap gap-2">
                        <h3 className="w-full text-xl font-semibold"> Dont't troll</h3>
                        <Container component="blockquote">
                            <ListItemText className="list-item list-disc">
                                Referral links, 1st post hunt, other comments, stats etc.
                            </ListItemText>
                        </Container>
                    </ListItem>
                    <ListItem className="flex-wrap gap-2">
                        <h3 className="w-full text-xl font-semibold"> Do as Instructed</h3>
                        <Container component="blockquote">
                            <ListItemText className="list-item list-disc"> If asked, instructed or warned, do as told.</ListItemText>
                        </Container>
                    </ListItem>

                </List>
                <List 
                component={"ul"}
                className="flex flex-col gap-4 border-2"
                subheader={
                    <header  className='flex items-center px-2  py-1 bg-blue-950 text-white gap-2'>
                        <ListItemText primary="Guidelines"/>
                        <Divider/>
                    </header>
                }
                >
                    <ListItem component="li">
                        <ListItemIcon className="text-sm w-fit">
                            <FiberManualRecordIcon className="text-sm w-fit"/>         
                        </ListItemIcon>
                        <ListItemText> act Like a normal person </ListItemText>
                    </ListItem>
                    <ListItem component="li">
                        <ListItemIcon>
                            <FiberManualRecordIcon/>         
                        </ListItemIcon>
                        <ListItemText> The more you disagree, the nicer you should be. </ListItemText>
                    </ListItem>
                    <ListItem component="li">
                        <ListItemIcon>
                            <FiberManualRecordIcon/>         
                        </ListItemIcon>
                        <ListItemText> When in the right context most things go, as long as you don’t violate the rules. </ListItemText>
                    </ListItem>
                    <ListItem component="li">
                        <ListItemIcon>
                            <FiberManualRecordIcon/>         
                        </ListItemIcon>
                        <ListItemText>You are entitled to your opinion, as long as you don’t violate the rules.</ListItemText>
                    </ListItem>
                    <ListItem component="li">
                        <ListItemIcon>
                            <FiberManualRecordIcon/>         
                        </ListItemIcon>
                        <ListItemText>You are responsible for the threads you participate in. No one can force you to join in or read it.</ListItemText>
                    </ListItem>
                </List>
            </div>

        </section>
    </>
}