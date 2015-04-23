/**
 * Email class
 *
 * Class in charge of sending emails
 */
package model;

import java.sql.SQLException;
import javax.mail.*;
import javax.mail.internet.*;
import java.util.*;
import java.util.ArrayList;
import model.sql.EvaluacionGrupo;

public class Email {

    final String miCorreo = "kedac007@gmail.com";
    final String miContraseña = "holaschavelo48";
    final String servidorSMTP = "smtp.gmail.com";
    final String puertoEnvio = "465";
    ArrayList<String> reportes = null;
    ArrayList<String> evaluaciones = null;
    ArrayList<String> instancias = null;
    String asunto = null;
    String cuerpo = null;

    public Email(ArrayList<String> reportes) {
        this.reportes = reportes;
    }

    public void enviar(String pTextoAdicional) throws SQLException {
        Properties props = new Properties();
        props.put("mail.smtp.user", miCorreo);
        props.put("mail.smtp.host", servidorSMTP);
        props.put("mail.smtp.port", puertoEnvio);
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.socketFactory.port", puertoEnvio);
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.socketFactory.fallback", "false");
        try {
            for (int i = 0; i < reportes.size(); i += 4) {
                Authenticator auth = new autenticarSMTP();
                Session session = Session.getInstance(props, auth);
                MimeMessage mensaje = new MimeMessage(session);
                mensaje.setFrom(new InternetAddress(miCorreo));
                this.asunto = "Reportes de Notas - Grupo: " + reportes.get(i + 1);
                this.evaluaciones = EvaluacionGrupo.getInstance().evaluacionGrupo(reportes.get(i + 1));
                mensaje.setSubject(asunto);
                this.cuerpo = "Estimado " + reportes.get(i + 2) + ",\n\n" + pTextoAdicional;
                this.cuerpo += "\n\n - Desglose de notas - \n";
                for (int j = 0; j < evaluaciones.size(); j += 4) {
                    this.cuerpo += "+ " + evaluaciones.get(j) + " : " + evaluaciones.get(j + 1) + "%\n";
                    this.instancias = EvaluacionGrupo.getInstance().instanciasEvaluacionMiembroGrupo(evaluaciones.get(j), reportes.get(i + 1), reportes.get(i + 2));                        
                    if (evaluaciones.get(j + 2).equals("Fija")) {
                        for (int k = 0; k < instancias.size(); k += 4) {
                            this.cuerpo += "    + " + instancias.get(k) + ": Valor Porcentual: " + instancias.get(k + 1) + "%, Fecha: " 
                                    + instancias.get(k + 3) + ", Nota: " + instancias.get(k + 2) + "\n";
                        }
                    }
                    else {
                        for (int k = 0; k < instancias.size(); k += 4) {
                            this.cuerpo += "    + " + instancias.get(k) + ": Fecha: " 
                                    + instancias.get(k + 3) + ", Nota: " + instancias.get(k + 2) + "\n";
                        }                    
                    }
                }
                this.cuerpo += "\nNota Acumulada: " + reportes.get(i + 3);
                mensaje.setText(cuerpo);
                mensaje.addRecipient(Message.RecipientType.TO, new InternetAddress(reportes.get(i)));
                Transport.send(mensaje);
                System.out.println("Enviado a: " + reportes.get(i));
            }
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }

    private class autenticarSMTP extends javax.mail.Authenticator {

        public PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(miCorreo, miContraseña);
        }
    }
}
