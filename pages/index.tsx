import { SearchOutlined } from '@ant-design/icons';
import {Button, Input, Typography} from 'antd';
import axios from 'axios';
import type { NextPage } from 'next';
import {useState} from "react";

const Home: NextPage = () => {

    const [url, setUrl] = useState('')
    const [isError, setIsError] = useState(false)

    const searchManga = async () => {
        try{
            setIsError(false)
            const response = await axios.get('http://127.0.0.1:5000', {
                url
            })
            console.log('response', response)
        }catch (e){
            setIsError(true)
            setUrl('')
        }
    }
    return (
        <div className="flex flex-col p-5 m-2">
            <h1 className="text-3xl font-bold ">
                Добро пожаловать
            </h1>
            <h2 className="text-lg font-bold">
                Вас приветсвует сервис по качествунному воровству манги с некоторых сайтов
            </h2>
            <h2 className="text-lg">
                Вставте ссылку на главу вашей манги, которую надо своровать
            </h2>

            <Input value={url} onChange={(e)=>setUrl(e.target.value)} className="mb-3 mt-3" size="large" placeholder="Ссылка на главу" prefix={<SearchOutlined />} />

            <div className="flex justify-center">
                <Button onClick={searchManga} disabled={!url} size="large" type="primary" className='max-w-xs'>
                    Начать обработку
                </Button>
            </div>
            {isError ? <Typography className="mt-5">Произошла ошибка, попробуйте еще раз или обратитесь к создателю</Typography> : <></>}
        </div>
    );
};

export default Home;
