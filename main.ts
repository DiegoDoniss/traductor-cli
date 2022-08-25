import Denomander from "https://deno.land/x/denomander/mod.ts";
import {Translate} from "./functions.ts";
import {from, to} from "./options.ts";

interface Params {
    text: string
}

const t = new Translate()

const program = new Denomander({
    app_name: "Translate cli",
    app_description: "Una herramienta practica para traducir palabras consumiendo el api de google",
    app_version: "1.0.0",
});

program
    .command('list', 'muestra una lista de los lenguajes disponibles')
    .alias('ls')
    .action(() => t.getListOfLanguages())

program
    .command('translate [text]', 'traduce un texto ingresado por defecto de ingles a español')
    .alias('ts')
    .addOption(from)
    .addOption(to)
    .action(({text}: Params) => t.translateText(text, program.to, program.from))

program
    .command('detect [text]')
    .alias('dt')
    .action(({text}: Params) => t.detect(text))

program.parse(Deno.args);
