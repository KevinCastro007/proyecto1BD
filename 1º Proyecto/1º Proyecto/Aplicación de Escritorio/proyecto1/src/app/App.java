/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app;

import model.sql.EvaluacionGrupo;
import view.JFPrincipal;
import java.sql.SQLException;

/**
 *
 * @author usuario
 */
public class App {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws SQLException {
        JFPrincipal vistaL = new JFPrincipal();
        vistaL.setVisible(true);
        vistaL.setLocationRelativeTo(null);          
    }
}
