'use client';

import { ArrowLongRightIcon } from '@/commons/components/Icon';
import { Meeting } from '@/types/meetings';
import React from 'react';

export function DetailMeeting({ meetings }: { meetings: Meeting[] }) {
    return (
        <>
            {meetings.map((meeting: Meeting, index) => (
                <React.Fragment key={index}>
                    <div className="flex justify-center items-center bg-slate-300 px-2 ml-2 my-1 rounded-lg">
                        {meeting.startDay}
                        <div className="w-5">
                            <ArrowLongRightIcon />
                        </div>
                        {meeting.endDay}
                    </div>
                    {index !== meetings.length - 1 && (
                        <span className="text-xl">, </span>
                    )}
                </React.Fragment>
            ))}
        </>
    );
}
