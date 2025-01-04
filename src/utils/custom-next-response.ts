import { NextResponse } from 'next/server';

export const NextJSError = (status: number = 500, message: string = 'Internal Server Error') => {
  return NextResponse.json({ success: false, message }, { status });
};

export const NextJSSuccess = (data: object | null, status: number = 200, message: string = 'Success') => {
  return NextResponse.json({ success: true, message, data }, { status });
};
