import { Controller, Get, Redirect, Render } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';

@Controller()
export class DashboardController {

    @Public()
    @Get('dashboard')
    @Render('dashboard')
    root()
    {       
        return {
            title: "Test"
        }
    }

    @Get()
    @Redirect('/dashboard')
    index() {}
}
