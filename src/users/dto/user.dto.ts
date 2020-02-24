import { ApiProperty } from "@nestjs/swagger";

export class UserDto {

    @ApiProperty({
        description: "用户名",
        required: true
    })
    readonly username: string;

    @ApiProperty({
        description: '密码',
        required: true
    })
    readonly password: string;
}

