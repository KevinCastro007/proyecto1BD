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

/**
 *
 * @author KEDAC
 */
public class EvaluacionGrupo {
    
    private ResultSet rs;
    private Statement stm = null;
    private static EvaluacionGrupo clase;   

    private EvaluacionGrupo(Statement pStm) {
        this.stm = pStm;
    }

    public synchronized static EvaluacionGrupo getInstance() {
        if (clase == null) {
            clase = new EvaluacionGrupo(SQLServer.getInstance("sa", "123",
                    "RegistroNotas", "localhost").getStm());
        }
        return clase;
    }

    public void insertarEvaluacion(String pGrupo, String pTipoEvaluacion, float pPorcentaje, int pCantidad, String pTipoInstancia) throws SQLException {
        String sPorcentaje = pPorcentaje + "";
        try {
            this.stm.executeQuery(String.format("dbo.RNSP_InsertarEvaluacion '%s', '%s', '%s', %d, '%s'", pGrupo, pTipoEvaluacion, sPorcentaje, pCantidad, pTipoInstancia)); 
        } catch (Exception e) {
            System.out.println(e);
        }
    }  
    
    public void insertarInstancia(String pGrupo, String pEvaluacion, float pValor, String pDescripcion, String pFecha) throws SQLException {
        String sValor = pValor + "";
        try {
            this.stm.executeQuery(String.format("dbo.RNSP_InsertarInstancia '%s', '%s', '%s', '%s', '%s'", pGrupo, pEvaluacion, sValor, pDescripcion, pFecha)); 
        } catch (Exception e) {
            System.out.println(e);
        }
    }   
    
    public void inicializarNotas(String pEstudiante, String pGrupo, String pEvaluacion) throws SQLException {
        try {
            this.stm.executeQuery(String.format("dbo.RNSP_InicializarNotas '%s', '%s', '%s'", pEstudiante, pGrupo, pEvaluacion)); 
        } catch (Exception e) {
            System.out.println(e);
        }
    }       
    
    public ArrayList<String> evaluacionGrupo(String pCodigo) throws SQLException {
        ArrayList<String> evaluaciones = new ArrayList<>();
        rs = this.stm.executeQuery(String.format("dbo.RNSP_EvaluacionesGrupo '%s'", pCodigo));
        while (rs.next()) {
            evaluaciones.add(rs.getString("Nombre"));
            evaluaciones.add(rs.getFloat("Porcentaje") + "%");
            int tipoInstacia = rs.getInt("TipoInstancia");
            if (tipoInstacia == 1) {
                evaluaciones.add("Fija");                
            }
            else {
                evaluaciones.add("Variable");
            }
            evaluaciones.add(rs.getInt("CantidadInstancia") + "");
        }
        return evaluaciones;
    }
    
    public ArrayList<String> instanciasEvaluacion(String pNombre, String pCodigo) throws SQLException {
        ArrayList<String> instancias = new ArrayList<>();
        rs = this.stm.executeQuery(String.format("dbo.RNSP_InstanciasEvaluacionGrupo '%s', '%s'", pNombre,  pCodigo));
        while (rs.next()) {
            instancias.add(rs.getString("Descripcion"));
            instancias.add(rs.getString("Valor") + "%");
        }
        return instancias;
    }   
    
    public ArrayList<String> instanciasEvaluacionMiembroGrupo(String pNombre, String pCodigo, String pEstudiante) throws SQLException {
        ArrayList<String> instancias = new ArrayList<>();
        rs = this.stm.executeQuery(String.format("dbo.RNSP_InstanciasEvaluacionMiembroGrupo '%s', '%s', '%s'", pNombre,  pCodigo, pEstudiante));
        while (rs.next()) {
            instancias.add(rs.getString("Descripcion"));
            instancias.add(rs.getString("Valor"));
            instancias.add(rs.getString("Nota"));
            instancias.add(rs.getString("Fecha"));
        }
        return instancias;
    }     
    
    public void aumentarCantidadInstancias(String pGrupo, String pEvaluacion) {
         try {
            this.stm.executeQuery(String.format("dbo.RNSP_AumentarCantidadInstancias '%s', '%s'", pGrupo, pEvaluacion)); 
        } catch (Exception e) {
            System.out.println(e);
        }   
    }
}
