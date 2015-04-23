/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.sql;

import model.sql.SQLServer;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class Grupo {

    private ResultSet rs;
    private Statement stm = null;

    private static Grupo grupo;

    private Grupo(Statement pStm) {
        this.stm = pStm;
    }

    public synchronized static Grupo getInstance() {
        if (grupo == null) {
            grupo = new Grupo(SQLServer.getInstance("sa", "123",
                    "RegistroNotas", "localhost").getStm());
        }
        return grupo;
    }

    public ArrayList<String> tiposEvaluaciones() throws SQLException {
        ArrayList<String> tiposEvaluaciones = new ArrayList<>();
        rs = this.stm.executeQuery("dbo.RNSP_TiposEvaluacion");
        while (rs.next()) {
            tiposEvaluaciones.add(rs.getString("Nombre"));
        }
        return tiposEvaluaciones;
    }
}
