import { AxiosResponse } from 'axios';
import { USERS } from './_constants';
import instance from '@/utils/axios/instance.axios';
import { UserList } from '@/types/userList';
import { PER_PAGE } from '@/commons/contants';

export const getAllUsers = (
    page: number
): Promise<AxiosResponse<Required<UserList>>> =>
    instance.get(USERS.GET_LIST, {
        params: { page, perPage: PER_PAGE },
    });
