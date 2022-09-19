import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { messagesApi } from '../../../features/messages/messagesApi';
import Message from './Message';

export default function Messages({ messages = [], totalMessage }) {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { id } = useParams();

    // local state
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        if (page > 1) {
            dispatch(
                messagesApi.endpoints.getMoreMessages.initiate({ id, page })
            );
        }
    }, [page, id, dispatch]);

    useEffect(() => {
        if (totalMessage > 0) {
            const hasMorePage = Math.ceil(
                totalMessage / Number(process.env.REACT_APP_MESSAGES_PER_PAGE) >
                    page
            );

            setHasMore(hasMorePage);
        }
    }, [page, totalMessage]);

    return (
        <div>
            <ul className="relative w-full h-[calc(100vh_-_197px)] ">
                {
                    <InfiniteScroll
                        dataLength={messages?.length}
                        next={fetchMore}
                        hasMore={hasMore}
                        loader={
                            <h4 className="text-slate-200 text-center py-1">
                                Loading...
                            </h4>
                        }
                        height={window.innerHeight - 197}
                        inverse={true}
                        className="space-y-2 p-6 flex flex-col-reverse scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent overflow-y-scroll scrollbar-thumb-rounded-full"
                    >
                        {messages
                            .slice()
                            .sort((x, y) => x.timestamp + y.timestamp)
                            .map((message) => {
                                const {
                                    id,
                                    message: lastMessage,
                                    sender,
                                } = message || {};
                                const { email } = user || {};

                                const justify =
                                    sender.email !== email ? 'start' : 'end';

                                return (
                                    <Message
                                        key={id}
                                        justify={justify}
                                        message={lastMessage}
                                    />
                                );
                            })}
                    </InfiniteScroll>
                }
            </ul>
        </div>
    );
}
