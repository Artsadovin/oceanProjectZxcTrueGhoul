
$( document ).ready(function() {
    $("#form_button").click(
		function(){
			sendAjaxForm('result_form', 'ajax_form', 'action_ajax_form.php');
			return false; 
		}
	);
});
 
function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
        url:     url, //url страницы (action_ajax_form.php)
        type:     "POST", //метод отправки
        dataType: "json", //формат данных
        data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
		
		 if(response.status === "success") {
                $('#result_form').html('<b>Спасибо, данные отправлены. Материалы придут к вам на почтовый адрес '+response.email);
            } else if(response.status === "error") {
                $('#result_form').html(response.messageerror);
            }       	
    	}
    	
 	});
}