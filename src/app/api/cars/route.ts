import { type NextRequest } from 'next/server';
import data from './cars.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const carType = searchParams.get('carType');

  return Response.json(data[carType]);
}
