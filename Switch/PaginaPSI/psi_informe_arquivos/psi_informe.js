j = jQuery.noConflict();

j(document).ready(function(){
    psi_requisito();
});

function cancelar_participacao_candidato() {
    if (confirm('Deseja cancelar sua participação nesse PSI?')==false) {
        return;
    };
    if (confirm('Caso você cancele sua participação, não será possível reativá-la.\nDeseja continuar com o cancelamento?')==false) {
        return;
    };
    
    j.ajax({
        url: "psi_informe_cancelar_participacao_py",
        data: {p_uid:     j('#uid_participacao').val()  },
        type: "post",
        dataType: "html",
        success: function(returnData){
            alert('Participação cancelada com sucesso!\n\nO cancelamento será apropriado a partir da inclusão da próxima etapa.\n\nSeu nome permanecerá nos resultados publicados antes do cancelamento.\n\nNão é necessário solicitar o cancelamento da participação para a CEPES20 ou abrir um chamado.');
            location.reload();
        },
        error: function(e){
           alert('Falha ao cancelar o registro!');
        }
    });

};

function gravar_confirmacao_candidato() {
    v_resposta = j("input[name='opt_confirmacao']:checked").val();
    v_uidEtapa = j("#uidEtapa").val();

    if (v_resposta == null) {
        alert('Você deve selecionar uma opção!');
        return;
    };
    if (confirm('Deseja confirmar sua opção?')==false) {
        return;
    };
    //if (confirm('Após confirmar, não será possível alterar sua opção.\nDeseja continuar com a gravação?')==false) {
    //    return;
    //};

    j.ajax({
        url: "psi_informe_gravar_confirmacao_py",
        data: {p_tipo_resposta: 1
              ,p_codigo:        j('#p_usuario').val()
              ,p_resposta:      v_resposta
              ,p_uid_etapa:     v_uidEtapa
              },
        type: "post",
        dataType: "html",
        success: function(returnData){
            if (returnData=='1') {
                alert('Opção gravada com sucesso! Você pode conferir a situação gravada acessando a opção Acesso do Empregado > Minha Página > PSI do menu.');
                location.reload();
            }
            else {
                alert('Atenção! ' + returnData);
            };
        },
        error: function(e){
           alert('Falha ao gravar o registro!');
        }
    });
};

function psi_alterar(p_uid) {
    j('[id="div_etapa"]').html('');
    j.ajax({
        url: 'psi_informe_dados',
        data: {p_psi: p_uid},
        type: "post",
        dataType: "html",
        beforeSend:function(){
            j('[id="div_psi_informe_dados"]').html('<img src="imagens/load.gif"/> <span>Por favor aguarde! Carregando...</span>');
        },
        success: function(returnData){
            j('[id="div_psi_informe_dados"]').html(returnData);
        },
        error: function(request, textStatus, errorThrown) {
            j('[id="div_psi_informe_dados"]').html('');
            alert("Falha ao alterar o PSI!");
        }
    });
}

function psi_excluir(p_uid) {
    psi_alterar(p_uid);
    if(confirm('Você tem certeza que deseja excluir esse PSI?\n\nAtenção!\nApós realizar a exclusão não será possível recuperar este registro.'))
    {
        j.ajax({
            url: "psi_informe_excluir_py",
            data: {p_uid: p_uid},
            type: "post",
            dataType: "html",
            success: function(returnData){
                alert('PSI excluído com sucesso!');
                j('.nav-tabs a[href="#tab_psi"]').click();
            },
            error: function(e){
                alert("Falha ao excluir o PSI!");
            }
        });
    }
}

function psi_log(p_uid) {
    window.open('telas_sis/log/lista?p_tabela=tb_psi_conf&p_uid=' + p_uid );
}

function psi_vagas_alterar(p_uid) {
    j('[id="div_etapa"]').html('');
    j.ajax({
        url: 'psi_informe_vagas',
        data: {p_uid: p_uid},
        type: "post",
        dataType: "html",
        beforeSend:function(){
            j('[id="div_psi_informe_vagas"]').html('<img src="imagens/load.gif"/> <span>Por favor aguarde! Carregando...</span>');
        },
        success: function(returnData){
            j('[id="div_psi_informe_vagas"]').html(returnData);
        },
        error: function(request, textStatus, errorThrown) {
            j('[id="div_psi_informe_vagas"]').html('');
            alert("Falha ao alterar as vagas do PSI!");
        }
    });
}

function psi_requisito() {
    j.ajax({
        url: 'psi_informe_requisito_py',
        data: {p_psi:     j('#p_psi').val()
              ,p_usuario: j('#p_usuario').val()
              },
        type: "post",
        dataType: "html",
        success: function(returnData){
            j('[id="div_requisito_item"]').html(returnData);
        }
    });
}

function psi_vagas_log(p_uid) {
    window.open('telas_sis/log/lista?p_tabela=tb_psi_conf_provimento&p_uid=' + p_uid );
}