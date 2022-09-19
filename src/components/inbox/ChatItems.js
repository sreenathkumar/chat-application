import { useDispatch, useSelector } from 'react-redux';
import {
    conversationsApi,
    useGetConversationsQuery,
} from '../../features/conversations/conversationsApi';
import Error from '../ui/Error';
import ChatItem from './ChatItem';
import moment from 'moment';
import getPartner from '../../utils/getPartner';
import gravatarUrl from 'gravatar-url';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

export default function ChatItems() {
    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};

    const { data, isLoading, isError, error } = useGetConversationsQuery(email) || {};

    const { data: conversations, totalCount } = data || {};

    const myConversations = conversations?.filter((conversation) =>
        conversation.participants.includes(email),
    );

    const dispatch = useDispatch();

    // local states
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        if (page > 1) {
            dispatch(
                conversationsApi.endpoints.getMoreConversations.initiate({
                    email,
                    page,
                }),
            );
        }
    }, [email, page, dispatch]);

    useEffect(() => {
        if (totalCount > 0) {
            const hasMorePage =
                Math.ceil(totalCount / Number(process.env.REACT_APP_CONVERSATIONS_PER_PAGE)) > page;
            setHasMore(hasMorePage);
        }
    }, [totalCount, page]);

    // manage content
    let content;

    if (isLoading) {
        content = <li className="m-2 text-slate-200 text-center">Loading...</li>;
    } else if (!isLoading && isError) {
        content = (
            <li className="m-2 text-center">
                <Error message={error.data}></Error>
            </li>
        );
    } else if (!isLoading && !isError && myConversations?.length === 0) {
        content = (
            <li className="m-2 text-slate-400 text-center flex flex-col gap-3 justify-center py-10">
                <FontAwesomeIcon className="text-xl" icon={faWarning} />
                No Conversation Found
            </li>
        );
    } else if (!isLoading && !isError && myConversations?.length > 0) {
        content = (
            <InfiniteScroll
                dataLength={myConversations?.length}
                next={fetchMore}
                hasMore={hasMore}
                loader={<h4 className="text-slate-200 text-center py-1">Loading...</h4>}
                height={window.innerHeight - 129}
                className="scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent overflow-y-scroll scrollbar-thumb-rounded-full"
            >
                {myConversations.map((conversation) => {
                    const { id, users, message, timestamp } = conversation || {};

                    const { email: partnerEmail, name } = getPartner(users, email);

                    return (
                        <li key={id}>
                            <Link to={`/inbox/${id}`}>
                                <ChatItem
                                    avatar={gravatarUrl(partnerEmail, {
                                        size: 80,
                                    })}
                                    name={name}
                                    lastMessage={message}
                                    lastTime={moment(timestamp).fromNow()}
                                />
                            </Link>
                        </li>
                    );
                })}
            </InfiniteScroll>
        );
    }

    return <ul>{content}</ul>;
}
