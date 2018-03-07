angular.module("myApp")
	.controller('hostCtrl',function($scope,$http,$window){

		$scope.update =function(id,hostgroup){
			console.log("Update");
			var data={

				 		"name":hostgroup.name,
				 		"parentid":hostgroup.parentid,
				 		"hostbaseline":hostgroup.hostbaseline,
				 		"suppress_excluded_service":hostgroup.suppress_excluded_service,
				 		"inverse_suppression":hostgroup.inverse_suppression,
				 		"host_trap":hostgroup.host_trap,
				 		"send_to_cta":hostgroup.send_to_cta,
				 		"description":hostgroup.description

				};
			$http({
				method:'PUT',
				url:'http://localhost:8080/jerseyrest/rest/hostgroup/'+id,
				data:data
			}).then(function successCallBack(response){
				$scope.hostgroup=null;
			});

		}





		
		$scope.initleft = function(){
			$(function () {
					var getData;
		 			var tree=[];
		 			$.ajax({
						type: 'GET',
       					 url: "http://localhost:8080/jerseyrest/rest/hostgroup/flatten",
        				dataType: 'json',
        				async: false,
        				success: function (response) {
        							getData = response;
           							for(var i=0;i<response.length;i++){
												var temp={};
												if(response[i].parentid==0){
													temp.id=response[i].id;
													temp.parent='#';
													temp.text=response[i].name;
													tree.push(temp)
													}else{
														temp.id=response[i].id;
														temp.parent=response[i].parentid;
														temp.text=response[i].name;
														tree.push(temp);
													}
												}
									}
							});
			
           			createJSTree(tree);
        		});

        function createJSTree(tree) {            
            $('#left').jstree({
                'core': {
                'data': tree
              		},
              	"check_callback" : true,
              	'plugins':[ "contextmenu","wholerow","types","dnd","state"],
              	'contextmenu':{
              		"select_node": false, 
              			"items": function ($node) {
                       		var trees = $("#left").jstree(true);
                       		
                        	return {
                        			"Remove": {
									            "separator_before": false,
									            "separator_after": false,
									            "label": "Remove",
									            "action": function (obj) {
									            	
									                    var id = $node.id;
									                    $.ajax({
															type: 'DELETE',
									       					url: "http://localhost:8080/jerseyrest/rest/hostgroup/delete/"+id,
									        									// dataType: 'json',
									        				async: false,
									        				success: function (response) {
									        					location.reload();
									        									
									           										}
																});					           
									                                 
									                        }
									            },
                          			"Create": {
                            	 				"separator_before": false,
          										"separator_after": false,
           										"label": "Create",
           										"action": function (obj) { 
           											var id=$node.id;
           												
           											// $scope.$apply(function(){$scope.hostgroup.parentid=id;});
}	
           											
           											
           											
            														}
                           						}
									}
								}
							})
                 		}
        		}



        $('#left').on("changed.jstree", function (e, data) {
        		var id = data.node.id;
        		$scope.$apply();
       			$http.get('http://localhost:8080/jerseyrest/rest/hostgroup/flatten')
        			.then(function successCallBack(response){
        						$scope.result=response.data;
								for(var i=0;i<$scope.result.length;i++){
										if($scope.result[i].id==id){
												$scope.hostgroup = $scope.result[i];
													}
												}
									// $scope.isDisabled=true;
									//  $scope.updateEnabled=true;
								console.log("success")
										});
        			
						})




		

		$scope.submit =function(id,hostgroup){
			if(id==null){
			var data={
				 
				 name:hostgroup.name,
				 parentid:hostgroup.parentid,
				 hostbaseline:hostgroup.hostbaseline,
				 suppress_excluded_service:hostgroup.suppress_excluded_service,
				 inverse_suppression:hostgroup.inverse_suppression,
				 host_trap:hostgroup.host_trap,
				 send_to_cta:hostgroup.send_to_cta,
				 description:hostgroup.description,
				
			};
			$http({
				method:'POST',
				url:'http://localhost:8080/jerseyrest/rest/hostgroup',
				data:data
			}).then(function successCallBack(response){
				$window.alert("Successfully Submitted");
				location.reload();
				console.log("success")
			});
		}else{
			// var data=
			$http({
				method:'PUT',
				url:'http://localhost:8080/jerseyrest/rest/hostgroup/'+id,
				data:{

				 		name:hostgroup.name,
				 		parentid:hostgroup.parentid,
				 		hostbaseline:hostgroup.hostbaseline,
				 		suppress_excluded_service:hostgroup.suppress_excluded_service,
				 		inverse_suppression:hostgroup.inverse_suppression,
				 		host_trap:hostgroup.host_trap,
				 		send_to_cta:hostgroup.send_to_cta,
				 		description:hostgroup.description

				}
			}).then(function successCallBack(response){
				$window.alert("Updated Successfully");
				location.reload();
			});

		}
}

		$scope.initleft();

		
	});