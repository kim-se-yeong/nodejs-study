export function HTML(title, list, body, control, auth) {
    return `
            <!doctype html>
            <html>
            <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                ${auth}
                <h1><a href="/">WEB</a><h1>
                ${list}
                ${control}
                ${body}
            </body>
            </html>
        `;
}
export function list(filelist) {
    var list = '<ul>';
    var i = 0;
    while (i < filelist.length) {
        list = list + `<li><a href="/topic/${filelist[i]}">${filelist[i]}</a></li>`;
        i = i + 1;
    }
    list = list + '</ul>';
    return list;
}