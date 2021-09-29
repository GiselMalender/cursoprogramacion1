var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res, next) => {


  var nombre = req.body.nombre;
  var apellido = req.body.apelido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'malendergisely@gmail.com',
    subject: 'contacto desde la web',
    html: nombre + " " + apellido + "se contacto a traves y quiere mas informacion de este correo: " + email + ". <br> ademas, hizo el siguiente comentario: " + mensaje + ". <br> su telefono es " + telefono
  }

  var transporte = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  var info = await transporte.sendMail(obj);

  res.render('index', {
    message: 'mensaje enviado correctamente',
  })
})

module.exports = router;