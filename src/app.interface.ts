import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {
    @ApiProperty()
    readonly access_token: string;
}
