import _ from 'lodash';
import { get } from '../request';

export const getBusRoute = async (req, res, next) => {
  try {
    let data = await get(
      process.env.TRANSLINK_URL + '/buses',
      { apikey: process.env.TRANSLINK_API },
      ''
    );
    return res.json(JSON.parse(data.text));
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
