export default function (data, total, Sender) {
  const GetList = ()=>{
    return data.map(item=>(
      `<tr class="show">
            <th scope="row" class="font-weight-normal">
              ${item.Name}
            </th>
            <td>${item.Price}DA</td>
            <td>${1}</td>
            <td class="text-right">${item.Price}DA</td>
          </tr>`
    ))
  }
  return `
          <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    html {
      font-family: sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    body {
      margin: 0;
    }
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    main,
    menu,
    nav,
    section,
    summary {
      display: block;
    }
    audio,
    canvas,
    progress,
    video {
      display: inline-block;
      vertical-align: baseline;
    }
    audio:not([controls]) {
      display: none;
      height: 0;
    }
    [hidden],
    template {
      display: none;
    }
    a {
      background-color: transparent;
    }
    a:active,
    a:hover {
      outline: 0;
    }
    abbr[title] {
      border-bottom: 1px dotted;
    }
    b,strong {
      font-weight: 700;
    }
    dfn {
      font-style: italic;
    }
    h1 {
      margin: 0.67em 0;
      font-size: 2em;
    }
    mark {
      color: #000;
      background: #ff0;
    }
    small {
      font-size: 80%;
    }
    sub,
    sup {
      position: relative;
      font-size: 75%;
      line-height: 0;
      vertical-align: baseline;
    }
    sup {
      top: -0.5em;
    }
    sub {
      bottom: -0.25em;
    }
    img {
      border: 0;
    }
    svg:not(:root) {
      overflow: hidden;
    }
    figure {
      margin: 1em 40px;
    }
    hr {
      height: 0;
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
    }
    pre {
      overflow: auto;
    }
    code,
    kbd,
    pre,
    samp {
      font-family: monospace, monospace;
      font-size: 1em;
    }
    .text-right{
      float: none
    }
    button,
    input,
    optgroup,
    select,
    textarea {
      margin: 0;
      font: inherit;
      color: inherit;
    }
    button {
      overflow: visible;
    }
    button,
    select {
      text-transform: none;
    }
    button,
    html input[type="button"],
    input[type="reset"],
    input[type="submit"] {
      -webkit-appearance: button;
      cursor: pointer;
    }
    button[disabled],
    html input[disabled] {
      cursor: default;
    }
    button::-moz-focus-inner,
    input::-moz-focus-inner {
      padding: 0;
      border: 0;
    }
    input {
      line-height: normal;
    }
    input[type="checkbox"],
    input[type="radio"] {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      height: auto;
    }
    input[type="search"] {
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
      -webkit-appearance: textfield;
    }
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
    }
    fieldset {
      padding: 0.35em 0.625em 0.75em;
      margin: 0 2px;
      border: 1px solid silver;
    }
    legend {
      padding: 0;
      border: 0;
    }
    textarea {
      overflow: auto;
    }
    optgroup {
      font-weight: 700;
    }
    table {
      border-spacing: 0;
      border-collapse: collapse;
    }
    td,
    th {
      padding: 0;
    }
    @media print {
      *,
      :after,
      :before {
        color: #000 !important;
        text-shadow: none !important;
        background: 0 0 !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
      }
      a,
      a:visited {
        text-decoration: underline;
      }
      a[href]:after {
        content: " (" attr(href) ")";
      }
      abbr[title]:after {
        content: " (" attr(title) ")";
      }
      a[href^="javascript:"]:after,
      a[href^="#"]:after {
        content: "";
      }
      blockquote,
      pre {
        border: 1px solid #999;
        page-break-inside: avoid;
      }
      thead {
        display: table-header-group;
      }
      img,
      tr {
        page-break-inside: avoid;
      }
      img {
        max-width: 100% !important;
      }
      h2,
      h3,
      p {
        orphans: 3;
        widows: 3;
      }
      h2,
      h3 {
        page-break-after: avoid;
      }
      .navbar {
        display: none;
      }
      .btn > .caret,
      .dropup > .btn > .caret {
        border-top-color: #000 !important;
      }
      .label {
        border: 1px solid #000;
      }
      .table {
        border-collapse: collapse !important;
      }
      .table td,
      .table th {
        background-color: #fff !important;
      }
      .table-bordered td,
      .table-bordered th {
        border: 1px solid #ddd !important;
      }
    }
    @font-face {
      font-family: "Glyphicons Halflings";
      src: url(../fonts/glyphicons-halflings-regular.eot);
      src: url(../fonts/glyphicons-halflings-regular.eot?#iefix)
          format("embedded-opentype"),
        url(../fonts/glyphicons-halflings-regular.woff2) format("woff2"),
        url(../fonts/glyphicons-halflings-regular.woff) format("woff"),
        url(../fonts/glyphicons-halflings-regular.ttf) format("truetype"),
        url(../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular)
          format("svg");
    }
    table {
      background-color: transparent;
    }
    caption {
      padding-top: 8px;
      padding-bottom: 8px;
      color: #777;
      text-align: left;
    }
    th {
      text-align: left;
    }
    .table {
      width: 100%;
      max-width: 100%;
      margin-bottom: 20px;
    }
    .table > tbody > tr > td,
    .table > tbody > tr > th,
    .table > tfoot > tr > td,
    .table > tfoot > tr > th,
    .table > thead > tr > td,
    .table > thead > tr > th {
      padding: 8px;
      line-height: 1.42857143;
      vertical-align: top;
      border-top: 1px solid #ddd;
    }
    .table > thead > tr > th {
      vertical-align: bottom;
      border-bottom: 2px solid #ddd;
    }
    .table > caption + thead > tr:first-child > td,
    .table > caption + thead > tr:first-child > th,
    .table > colgroup + thead > tr:first-child > td,
    .table > colgroup + thead > tr:first-child > th,
    .table > thead:first-child > tr:first-child > td,
    .table > thead:first-child > tr:first-child > th {
      border-top: 0;
    }
    .table > tbody + tbody {
      border-top: 2px solid #ddd;
    }
    .table .table {
      background-color: #fff;
    }
    .table-condensed > tbody > tr > td,
    .table-condensed > tbody > tr > th,
    .table-condensed > tfoot > tr > td,
    .table-condensed > tfoot > tr > th,
    .table-condensed > thead > tr > td,
    .table-condensed > thead > tr > th {
      padding: 5px;
    }
    .table-bordered {
      border: 1px solid #ddd;
    }
    .table-bordered > tbody > tr > td,
    .table-bordered > tbody > tr > th,
    .table-bordered > tfoot > tr > td,
    .table-bordered > tfoot > tr > th,
    .table-bordered > thead > tr > td,
    .table-bordered > thead > tr > th {
      border: 1px solid #ddd;
    }
    .table-bordered > thead > tr > td,
    .table-bordered > thead > tr > th {
      border-bottom-width: 2px;
    }
    .table-striped > tbody > tr:nth-of-type(odd) {
      background-color: #f9f9f9;
    }
    .table-hover > tbody > tr:hover {
      background-color: #f5f5f5;
    }
    table col[class*="col-"] {
      position: static;
      display: table-column;
      float: none;
    }
    table td[class*="col-"],
    table th[class*="col-"] {
      position: static;
      display: table-cell;
      float: none;
    }
    .table > tbody > tr.active > td,
    .table > tbody > tr.active > th,
    .table > tbody > tr > td.active,
    .table > tbody > tr > th.active,
    .table > tfoot > tr.active > td,
    .table > tfoot > tr.active > th,
    .table > tfoot > tr > td.active,
    .table > tfoot > tr > th.active,
    .table > thead > tr.active > td,
    .table > thead > tr.active > th,
    .table > thead > tr > td.active,
    .table > thead > tr > th.active {
      background-color: #f5f5f5;
    }
    .table-hover > tbody > tr.active:hover > td,
    .table-hover > tbody > tr.active:hover > th,
    .table-hover > tbody > tr:hover > .active,
    .table-hover > tbody > tr > td.active:hover,
    .table-hover > tbody > tr > th.active:hover {
      background-color: #e8e8e8;
    }
    .table > tbody > tr.success > td,
    .table > tbody > tr.success > th,
    .table > tbody > tr > td.success,
    .table > tbody > tr > th.success,
    .table > tfoot > tr.success > td,
    .table > tfoot > tr.success > th,
    .table > tfoot > tr > td.success,
    .table > tfoot > tr > th.success,
    .table > thead > tr.success > td,
    .table > thead > tr.success > th,
    .table > thead > tr > td.success,
    .table > thead > tr > th.success {
      background-color: #dff0d8;
    }
    .table-hover > tbody > tr.success:hover > td,
    .table-hover > tbody > tr.success:hover > th,
    .table-hover > tbody > tr:hover > .success,
    .table-hover > tbody > tr > td.success:hover,
    .table-hover > tbody > tr > th.success:hover {
      background-color: #d0e9c6;
    }
    .table > tbody > tr.info > td,
    .table > tbody > tr.info > th,
    .table > tbody > tr > td.info,
    .table > tbody > tr > th.info,
    .table > tfoot > tr.info > td,
    .table > tfoot > tr.info > th,
    .table > tfoot > tr > td.info,
    .table > tfoot > tr > th.info,
    .table > thead > tr.info > td,
    .table > thead > tr.info > th,
    .table > thead > tr > td.info,
    .table > thead > tr > th.info {
      background-color: #d9edf7;
    }
    .table-hover > tbody > tr.info:hover > td,
    .table-hover > tbody > tr.info:hover > th,
    .table-hover > tbody > tr:hover > .info,
    .table-hover > tbody > tr > td.info:hover,
    .table-hover > tbody > tr > th.info:hover {
      background-color: #c4e3f3;
    }
    .table > tbody > tr.warning > td,
    .table > tbody > tr.warning > th,
    .table > tbody > tr > td.warning,
    .table > tbody > tr > th.warning,
    .table > tfoot > tr.warning > td,
    .table > tfoot > tr.warning > th,
    .table > tfoot > tr > td.warning,
    .table > tfoot > tr > th.warning,
    .table > thead > tr.warning > td,
    .table > thead > tr.warning > th,
    .table > thead > tr > td.warning,
    .table > thead > tr > th.warning {
      background-color: #fcf8e3;
    }
    .table-hover > tbody > tr.warning:hover > td,
    .table-hover > tbody > tr.warning:hover > th,
    .table-hover > tbody > tr:hover > .warning,
    .table-hover > tbody > tr > td.warning:hover,
    .table-hover > tbody > tr > th.warning:hover {
      background-color: #faf2cc;
    }
    .table > tbody > tr.danger > td,
    .table > tbody > tr.danger > th,
    .table > tbody > tr > td.danger,
    .table > tbody > tr > th.danger,
    .table > tfoot > tr.danger > td,
    .table > tfoot > tr.danger > th,
    .table > tfoot > tr > td.danger,
    .table > tfoot > tr > th.danger,
    .table > thead > tr.danger > td,
    .table > thead > tr.danger > th,
    .table > thead > tr > td.danger,
    .table > thead > tr > th.danger {
      background-color: #f2dede;
    }
    .table-hover > tbody > tr.danger:hover > td,
    .table-hover > tbody > tr.danger:hover > th,
    .table-hover > tbody > tr:hover > .danger,
    .table-hover > tbody > tr > td.danger:hover,
    .table-hover > tbody > tr > th.danger:hover {
      background-color: #ebcccc;
    }
    .table-responsive {
      min-height: 0.01%;
      overflow-x: auto;
    }
    tr{
      display: none
    }
    tr.show{
      display: table-row
    }
    </style>
</head>
<body>

<div class="container space-2 px-md-7 px-lg-11">
<div class="card">
<div class="card-body p-5 p-md-7 p-lg-11">
  <div class="row justify-content-lg-between align-items-sm-center mb-11">
    <div class="col-sm-6 col-lg-4 order-sm-1">
      <h2 class="h1 text-primary font-weight-semi-bold">
        New Command.
      </h2>
      <address>
      Email: ${Sender.From}
      </address>
      <div class="d-block text-muted">
        tel: ${Sender.PhoneNumber}
      </div>
    </div>
  </div>

  <div class="row justify-content-md-between mb-7">
    <div class="col-md-5 col-lg-4">
      <h3 class="h5">Bill to:
      <span class="d-block text-secondary">
        ${Sender.Name}
      </span>
      </h3>
    </div>
  </div>

  <table class="table table-heighlighted font-size-1 mb-9">
    <thead>
      <tr class="text-uppercase text-secondary show">
        <th scope="col" class="font-weight-medium">
          Product
        </th>
        <th scope="col" class="font-weight-medium">
          U.Price
        </th>
        <th scope="col" class="font-weight-medium">
          Quantity
        </th>
        <th scope="col" class="font-weight-medium text-right">
          Price
        </th>
      </tr>
    </thead>
    <tbody>
        ${GetList()}
    </tbody>
    <tfoot>
      <tr class="show">
        <td scope="row">
        <h4>Total</h4>
        </td>
        <td colSpan="3" class="text-right">
          <h4>${total}DA</h4>
        </td>
      </tr>
    </tfoot>
  </table>
  <div class="row justify-content-lg-between">
    <div class="col-md-8 col-lg-5 order-md-2 mb-md-0 mb-5">
      <h4 class="h6">Thank You For Choosing Us! 🙌</h4>
      <p class="font-size-1 mb-0">
        We hope you've enjoyed your meal... <br />
        Visit us again soon! 😊
      </p>
    </div>

    <div class="col-md-4 col-lg-6 order-md-1 align-self-end">
      <h4 class="small text-muted mb">
        <span class="text-muted-f font-weight-medium">
          &copy;
        </span>
        Made with <i class="fas fa-heart px-1"></i>
        &amp;
        <i class="fas fa-coffee px-1"></i>By
        <span class="text-muted-f font-weight-medium">
          Hax Codes.
        </span>
      </h4>
    </div>
  </div>
</div>
</div>
</div>
</body>
</html>
          `;
}
