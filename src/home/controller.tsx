import Controller from '@curveball/controller';
import { Context } from '@curveball/core';

import html from './formats/html';

class HomeController extends Controller {

  get(ctx: Context) {

    ctx.response.type = 'text/html; charset=utf-8';
    ctx.response.body = html();

  }

}

export default new HomeController();
