import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validarUsuario(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

  @Post('google')
  async googleLogin(@Body() body: { email: string; googleId: string; name: string; photo?: string; idToken?: string }) {
    // AQUÍ DEBERÍAMOS VALIDAR EL idToken con Google API para seguridad real.
    // body.idToken -> Verificar con google-auth-library
    
    // Por simplicidad del prototipo, confiamos en los datos enviados (NO HACER EN PROD SIN VALIDAR TOKEN)
    const profile = {
      email: body.email,
      googleId: body.googleId,
      nombre: body.name,
      foto: body.photo
    };

    const user = await this.authService.validarUsuarioGoogle(profile);
    return this.authService.login(user);
  }
}
