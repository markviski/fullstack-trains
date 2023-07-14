import express from 'express';
import { join } from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import render from './routes/render.js';
import createRoute from './routes/createRoute.js';
import createRouteSubmit from './routes/createRouteSubmit.js';
import booking from './routes/booking.js';
import bookingSubmit from './routes/bookingSubmit.js';
import searchRender from './routes/searchRender.js';
import seeBookings from './routes/seeBookings.js';
import listMyBookings from './routes/listMyBookings.js';
import apiRouter from './routes/api.js';
import register from './routes/register.js';
import registerSubmit from './routes/registerSubmit.js';

import auth from './routes/auth.js';
import checkLogin from './middleware/checkLogin.js';
import checkUsername from './middleware/checkUsername.js';

const app = express();
app.use(cookieParser());

app.use(checkUsername);
app.use('/', render);
app.use('/api', apiRouter);

const staticDir = join(process.cwd(), 'static');
app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'));
app.use(express.static(staticDir));
app.set('view engine', 'ejs');

app.use('/login', auth);
app.use('/register', register);
app.use('/register_submit', registerSubmit);

app.use(checkLogin);
app.use('/create_route', createRoute);
app.use('/create_route_form', createRouteSubmit);
app.use('/booking', booking);
app.use('/train_booking_form', bookingSubmit);
app.use('/route_search_form', searchRender);
app.use('/see_bookings', seeBookings);
app.use('/list_my_bookings', listMyBookings);
app.use('/logout', auth);

app.listen(5555, () => { console.log('Server listening on http://localhost:5555/ ...'); });
