package model.sql;

import model.sql.SQLServer;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import javax.swing.DefaultComboBoxModel;

public class Profesor {

    private ResultSet rs;
    private Statement stm = null;
    private String UsuarioProfesor;
    private static Profesor profesor;

    private Profesor(Statement pStm) {
        this.stm = pStm;
    }

    public synchronized static Profesor getInstance() {
        if (profesor == null) {
            profesor = new Profesor(SQLServer.getInstance("sa", "123",
                    "RegistroNotas", "localhost").getStm());
        }
        return profesor;
    }

    public String getUsuarioProfesor() {
        return UsuarioProfesor;
    }

    public boolean login(String pUsuario, String pClave) throws SQLException {
        rs = this.stm.executeQuery(String.format("SELECT Result = "
                + "dbo.RNF_IdentificarProfesor('%s', '%s')", pUsuario, pClave));
        String result = "";
        while (rs.next()) {
            result = (rs.getString("Result"));
        }
        return ("1".equals(result));
    }

    public ArrayList<String> gruposProfesor(String pUsuario) throws SQLException {
        ArrayList<String> grupos = new ArrayList<>();
        rs = this.stm.executeQuery(String.format("dbo.RNSP_GruposProfesor '%s'", pUsuario));
        while (rs.next()) {
            grupos.add(rs.getString("Codigo"));
        }
        return grupos;
    }
}
