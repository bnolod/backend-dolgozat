import { Body, Controller, Get, Post, Redirect, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('foglalas')
  @Render('foglalas')
  getFoglalas() {
    return {
      errors: [],
      name: "",
      email: "",
      date: "",
      guests: "",
    };
  }
  @Get('sikeresfoglalas')
  @Render('sikeresfoglalas')
  getSikeresFoglalas() {
    return {
      message: "Sikeres foglalás!"
    };
  }

  @Post('foglalas')
  Foglalas(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: {name: string, email: string, date: Date, guests: string})
  {
    const errors = [];
    console.log(body);
    if (body.name === "") {
      errors.push("Név megadása kötelező!");
    }
    if (body.email === "") {
      errors.push("Email megadása kötelező!");
    }
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regexEmail.test(body.email)) {
      errors.push("Hibás email formátum!");
    }

    if (body.date < new Date()) {
      errors.push("Hibás dátum!");
    }
    if ((Number(body.guests) < 1) || (Number(body.guests) > 10)) {
      errors.push("A vendégek száma 1 és 10 közötti szám lehet!");
    }

    if (errors.length > 0) {
      res.render('foglalas', {
      errors: errors,
      name: body.name,
      email: body.email,
      date: body.date,
      guests: body.guests,
      });
    }
    else {
      res.redirect('sikeresfoglalas');
    }
    
    
    
  }
}
