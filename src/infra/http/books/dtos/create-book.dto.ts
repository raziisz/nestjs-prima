import { IsNotEmpty } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty({ message: "Campo título não deve ser vazio"})
    readonly title: string;
    @IsNotEmpty({ message: "Campo descrição não deve ser vazio"})
    readonly description: string;
    @IsNotEmpty({ message: "Campo código de barra não deve ser vazio"})
    readonly bar_code: string;
}