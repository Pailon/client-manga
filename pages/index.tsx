import { SearchOutlined } from '@ant-design/icons';
import {Button, Input, Typography, Spin} from 'antd';
import axios from 'axios';
import type { NextPage } from 'next';
import {useState} from "react";

const Home: NextPage = () => {

    const [url, setUrl] = useState('')
    const [isError, setIsError] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const searchManga = async () => {
        try{
            setIsError(false)
            // axios.get(`http://127.0.0.1:5000/image.jpeg`)
            setLoading(true)
            const {data} = await axios.post('http://127.0.0.1:5000', {
                url
            })
            setLoading(false)
            let element = document.createElement('a');
            element.setAttribute('href', `http://127.0.0.1:5000/${data}`);
            element.setAttribute('download', data);
            console.log(element)
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
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

            <Input disabled={isLoading} value={url} onChange={(e)=>setUrl(e.target.value)} className="mb-3 mt-3" size="large" placeholder="Ссылка на главу" prefix={<SearchOutlined />} />

            {
                isLoading
                ? <Spin size="large" />
                : <div className="flex justify-center">
                    <Button onClick={searchManga} disabled={!url || isLoading} size="large" type="primary" className='max-w-xs'>
                        Начать обработку
                    </Button>
                </div>
            }
            {isError ? <Typography className="mt-5 color-red">Произошла ошибка, попробуйте еще раз или обратитесь к создателю</Typography> : <></>}
            {/* {resUrl ? <a href={`http://127.0.0.1:5000/${resUrl}`}>save</a> : <></>} */}
        </div>
    );
};

export default Home;
