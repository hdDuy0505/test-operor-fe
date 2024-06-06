'use client';

import { getAllUsers } from '@/apis/users.api';
import { User } from '@/types/users';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DetailMeeting } from './components/DetailMeeting';
import { UserList } from '@/types/userList';

export default function UserListPage() {
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [users, setUsers] = useState<User[]>([]);

    const { data, error } = useQuery<AxiosResponse<Required<UserList>>>({
        queryKey: ['users', page],
        queryFn: () => getAllUsers(page),
        staleTime: 5 * 1000,
    });
    const userList = useMemo(() => data?.data, [data]);

    useEffect(() => {
        if (userList) {
            setUsers([...users, ...userList.data]);

            if (userList?.page === userList.totalPages) setHasMore(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userList]);

    const fetchMoreData = () => setPage(page + 1);

    return (
        <div className="container">
            <h1 className="font-bold my-[20px] text-4xl">User list</h1>

            <div className="border-4 rounded-xl w-full md:w-2/3 my-[20px] bg-white pt-2">
                <InfiniteScroll
                    dataLength={users?.length || 0}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={
                        error ? (
                            <h4 className="text-center text-red-600">
                                Please start the backend website!
                            </h4>
                        ) : (
                            <h4 className="text-center">...Loading</h4>
                        )
                    }
                    endMessage={
                        <h4 className="text-center text-lg text-red-600 px-3 pb-3">
                            No more data is available!
                        </h4>
                    }
                >
                    <>
                        {users?.map((user, index) => (
                            <>
                                <div
                                    key={index}
                                    className="flex flex-col w-full"
                                >
                                    <div className="flex justify-center w-full">
                                        <span className="font-bold text-xl">
                                            {user.firstName} {user.lastName}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 w-full max-lg:px-3 px-32 ">
                                        <div className="col-span-full">
                                            <span className="font-bold">
                                                Email:{' '}
                                            </span>
                                            <span>{user.email}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold">
                                                ID:{' '}
                                            </span>
                                            <span>{user.id}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold">
                                                Gender:{' '}
                                            </span>
                                            <span>{user.gender}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold">
                                                Day:{' '}
                                            </span>
                                            <span>{user.days}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold">
                                                Day without meeting:{' '}
                                            </span>
                                            <span>
                                                {user.days -
                                                    user.meetings.length}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap col-span-full">
                                            <span className="font-bold my-1">
                                                Meeting days:{' '}
                                            </span>
                                            <DetailMeeting
                                                meetings={user.meetings}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b-2 mx-9 my-5"></div>
                            </>
                        ))}
                    </>
                </InfiniteScroll>
            </div>
        </div>
    );
}
