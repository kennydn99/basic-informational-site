const http = require("http");
const url = require("url");
const fs = require("fs");

const errPage = fs.readFileSync("./404.html", function (err, data) {
  if (err) throw err;
  return data;
});

http
  .createServer(function (req, res) {
    const pathname = url.parse(req.url, true).pathname;
    const filename = pathname === "/" ? "./index.html" : `.${pathname}.html`;

    fs.readFile(filename, function (error, data) {
      if (error) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(errPage);
        return res.end();
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
