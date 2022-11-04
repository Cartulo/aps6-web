export class PrintUtils {
    
    public static imprimir(elementId: string, title: string, templateImage?: boolean) {
        const html = document.getElementById(elementId).innerHTML;
        let script = '';
        const scripts = document.getElementsByClassName('script-print');

        for (let i = 0; i < scripts.length; i++) {
            script += `<script>${scripts[i].innerHTML}</script>`;
        }

        const htmlDocument = templateImage ? this.templateImage(html, title) : this.templateReport(html, title, script);

        const newWindow = window.open();
        newWindow.document.write(htmlDocument);
    }

    public static imprimirRecibo(elementId: string, title: string, recibo: string) {
        const html = document.getElementById(elementId).innerHTML;
        const htmlDocument = this.imprimirReciboTemplate(html, title, recibo);

        const newWindow = window.open();
        newWindow.document.write(htmlDocument);
    }

    private static templateImage(html: string, title: string) {
        return `
<html>
<head>
  <title>${title} - BMC</title>
  <style>
    @media print {
      @page {
        margin: 0;
      }
      body {
        margin: 1cm;
      }
    }
  </style>
</head>
<body align="center">
  ${html}
</body>
</html>`;
    }

    private static templateReport(html: string, title: string, script: string) {
        return `
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <title>${title} - BMC</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb"
        crossorigin="anonymous">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/quill/1.1.8/quill.snow.min.css" />

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <style>
        @media print {
            @page {
                margin: 0;
            }
            body,
            table {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }

            table.report-container {
                page-break-after: always;
            }
            thead.report-header {
                display: table-header-group;
            }
            tfoot.report-footer {
                display: table-footer-group;
            }
            .card {
                z-index: -1000;
            }
            .break-page {
                page-break-before: always;
            }

            #spacer {
                height: 2em;
            }

            #footer {
                position: fixed;
                bottom: 0;
                width: 100%;
            }

            .table .bg-gray td  {
                background-color: #e8e8e8 !important;
            }
        }
        body {
            margin-right: -7px;
        }
        .main {
            padding: 10px;
        }
        .header-info{
            /*padding: 10px;*/
        }
        .bg-color {
            background-color: #000000 !important;
        }
        .bg-white {
            background-color: #ffffff !important;
        }
        .bg-gray {
            background-color: #e8e8e8 !important;
        }
        .card {
            margin-top: 10px;
        }
        .card-body.m-b-0 p {
            margin-bottom: 0px;
        }
        .bg-mr {
            background-color: #000000;
            color: white;
            font-weight: bold;
        }
        .table td {
            border-color: #001e2d36;
        }
        .table thead th {
            border: 0px;
        }
        .text-color-red {
            color: red;
        }
        .text-color-green {
            color: #4caf50;
        }
        .navbar-brand {
            padding-top: 0;
            padding-bottom: 0;
        }
    </style>
</head>

<body>

    <table class="report-container" width="100%">
        <thead class="report-header">
            <tr class="bg-color">
                <th class="report-header-cell">
                    <div class="header-info">
                        <img class="navbar-brand" src="https://portal.bmcorporate.com.br/tools/images/e-mail-head-1.png" style="max-height: 100px;margin-left: 40px">
                        <img class="navbar-brand" src="https://portal.bmcorporate.com.br/tools/images/e-mail-head-2.png" style="max-height: 70px;margin-right: 40px;margin-top: 10px;float: right">
                    </div>
                </th>
            </tr>
        </thead>
        <tfoot class="report-footer">
            <tr>
                <td class="report-footer-cell" id="spacer">
                    <div class="footer-info">
                        &nbsp
                    </div>
                </td>
            </tr>
        </tfoot>
        <tbody class="report-content">
            <tr>
                <td class="report-content-cell">
                    <div class="main">
                        ${html}
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <div id="footer" class="bg-color">
        &nbsp
    </div>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh"
        crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
    ${script}
</body>

</html>`;
    }

    private static imprimirReciboTemplate(html: string, title: string, recibo: string) {
        return `
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${recibo} - ${title}</title>
    <style type="text/css">
        @media print {
            @page {
                margin: 0;
            }

            body {
                margin: 1cm;
            }
        }

        body {
            color: #000000;
            background-color: #ffffff;
            margin-top: 0;
            margin-left: 10px;
            margin-right: 30px;
        }

        * {
            margin: 0px;
            padding: 0px;
        }

        table {
            border: 0;
            border-collapse: collapse;
            padding: 0;
        }

        img {
            border: 0;
        }

        .mr-cp {
            font: bold 12px arial;
            color: black;
        }

        .mr-ti {
            font: 9px arial, helvetica, sans-serif;
        }

        .mr-ld {
            font: bold 15px arial;
            color: #000000;
        }

        .mr-ct {
            font: 11px "arial narrow";
            color: #000033;
        }

        .mr-bc {
            font: bold 22px arial;
            color: #000000;
        }

        .mr-cut {
            width: 665px;
            height: 1px;
            border-top: dashed 1px #000;
        }

        .mr-Ac {
            text-align: center;
        }

        .mr-Ar {
            text-align: right;
        }

        .mr-At {
            vertical-align: top;
        }

        .mr-Ab {
            vertical-align: bottom;
        }

        .mr-ct td,
        .mr-cp td {
            padding-left: 6px;
            border-left: solid 1px #000;
            border-right: solid 1px #000;
        }

        .mr-cpN {
            font: bold 10px arial;
            color: black;
        }

        .mr-ctN {
            font: 9px "arial narrow";
            color: #000033;
        }

        .mr-ctNR {
            font: bold 12px "arial narrow";
            color: #000033;
        }

        .mr-rBb td {
            border-bottom: solid 1px #000;
        }

        .mr-h13 {
            height: 13px;
        }

        .mr-h12 {
            height: 12px;
        }

        .mr-h40 {
            height: 40px;
        }

        .mr-h50 {
            height: 50px;
        }

        .mr-h13 td {
            vertical-align: top;
        }

        .mr-h12 td {
            vertical-align: top;
        }

        .mr-w65 {
            width: 65px;
        }

        .mr-w180 {
            width: 180px;
        }

        .mr-w472 {
            width: 472px;
        }

        .mr-w500 {
            width: 500px;
        }

        .mr-w659 {
            width: 659px;
        }

        .mr-w666 {
            width: 100%;
        }

        .mr-w50p {
            width: 50%;
        }

        .mr-BHead td {
            border-bottom: solid 2px #000;
        }

        .mr-fs-8 {
            font-size: 8px;
        }

        .mr-fs-10 {
            font-size: 10px;
        }

        .mr-text-align-center {
            text-align: center;
        }

        .mr-p-tb {
            padding-top: 3px;
            padding-bottom: 3px;
        }

        .mr-p-b-4 {
            padding-bottom: 4px;
        }

        .mr-b-l-none {
            border-left: 0px !important;
        }

        .mr-b-r-none {
            border-right: 0px !important;
        }

        .mr-assinatura-1 {
            position: absolute;
            right: 25%;
            z-index: 9999;
        }

        .mr-watermark {
            position: absolute;
            left: 25%;
            top: 42.5%;
            z-index: 9999;
            color: black;
            opacity: 0.6;

            font-family: Open Sans;
            font-style: normal;
            font-weight: bold;
            font-size: 60px;
            text-align: center;

            transform: rotate(350deg);
            -webkit-transform: rotate(350deg);
        }

        .mr-background {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 9000;
            
            opacity: 0.3;
            -webkit-print-color-Adjust: exact;
            background: repeating-linear-gradient(
                325deg,
                #AEAEAE,
                #AEAEAE 10px,
                #383838 10px,
                #383838 20px
            );
        }
    </style>
</head>

<body>
${html}
</body>
</html>`;
    }
}
