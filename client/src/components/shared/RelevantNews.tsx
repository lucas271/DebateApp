import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FlagIcon from '@mui/icons-material/Flag';
import Divider from '@mui/material/Divider';


interface newsInterface{
    text:  string,
    countryCode: string,
    id: number | string,
    created_at: Date,
    comments: string[]
}

function RelevantNews() {

    //bellow line will become a fetch at somepoint
    const newsArr: newsInterface[] = [
        {
            text: "blalbalbla set to replace the blalbalbla in the world cup",
            countryCode: "BR",
            id: 2,
            created_at: new Date(Date.now()),
            comments: []
        },
        {
            text: "blalbalbla set to replacereplacereplreplacereplacereplreplacereplacereplreplacereplacereplreplacereplacereplreplacereplacerepl the blalbalbla in the world cup",
            countryCode: "BR",
            id: 3,
            created_at: new Date(Date.now()),
            comments: []
        },
        {
            text: "blalbalbla set to replace the blalbalbla in the world cup",
            countryCode: "BR",
            id: 4,
            created_at: new Date(Date.now()),
            comments: []
        },
        {
            text: "blalbalbla set to replace the blalbalbla in the world cup",
            countryCode: "BR",
            id: 5,
            created_at: new Date(Date.now()),
            comments: []
        }
    ]

    return (
      <List
        sx={{ width: '100%'}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        className="bg-blue-800 text-white font-bold uppercase h-fit rounded-lg"
        subheader={
          <header  className='flex items-center px-2  py-1 bg-blue-950 gap-2'>
            <NewspaperIcon/>
            <ListItemText primary="News"/>
          </header>
        }
      >
        {newsArr.map((news, index) => {
            return <>
                <ListItemButton key={news.id} className=' h-32 overflow-hidden border-white cursor-pointer'>
                    <ListItemIcon>
                        <FlagIcon /> {/* will replace this for country flags later on.*/}
                    </ListItemIcon>
                    <ListItemText className='h-full overflow-hidden'>
                        <div className=' h-full  w-full flex flex-col-reverse overflow-hidden'>
                            <div className='shrink overflow-hidden sm:text-md text-sm'>
                                <p className='text-wrap break-words'>{news.text}</p>

                            </div>
                            <div className='py-2 flex justify-between flex-wrap text-xs text-blue-950 font-bold italic'>
                                <span>{(news.created_at.getTime() - Date.now()) / 60} minutes ago</span>
                                <span>{news.comments.length || 0} Comments</span>
                            </div>
                        </div>

                    </ListItemText>
                </ListItemButton>
                
                {newsArr[newsArr.length - 1].id !== newsArr[index].id && <Divider/>}
            </>
        })}

      </List>
    );
}

export default RelevantNews;
