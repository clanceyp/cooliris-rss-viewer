/**
 * @author patcla
 */

(function($, chrome, document, window){
"use strict";

    var alert = window.alert,
        confirm = window.confirm,
        backgroundPage = chrome.extension.getBackgroundPage(),
        options = {
            ops:{
                "input":[
                    {"name":"THEME","label":"Theme","type":"select",options:{"BLACK":"Black","FINALFRONTIER":"Final frontier", "RADIANCE":"Radiance","SLATE":"Slate","SPECTRUM":"Spectrum","WHITE":"White"}}
                    ,{"name":"ROWS","label":"Number of rows","type":"text","html5":"range",ops:{"min":1,"max":5,"step":1}}
                ]
            },
            init:function(){
                var manifest = chrome.runtime.getManifest();
                $("h1").html(manifest.name + " <span>"+ manifest.version +"</span>");
                $("#appVersion").text(manifest.version);
                $("#appName").text(manifest.name);
                options.setupForm();
            },
            getItemValue:function(key){
                var value = backgroundPage.coolrss.getLocalStore(key);
                console.log(key, value)
                return value;
            },
            saveItemValue:function(target){
                if (!target){return true;}
                var id = $(target).attr("id"),
                    value = $(target).attr('value'),
                    type = $(target).attr('type');
                if (type === "checkbox"){
                    backgroundPage.coolrss.setLocalStore(id, $(target).prop('checked') );
                } else {
                    backgroundPage.coolrss.setLocalStore(id,value);
                }
            },
            handleValueChange:function(e){
                var target = e.target;
                options.saveItemValue(target);
            },
            handleKeyup:function(e){
                var target = e.target;
                options.saveItemValue(target);
            },
            handleClick:function(e){
                var target = e.target;
                if (!target){return true;}
                if ($(target).attr('type') === 'reset'){
                    e.preventDefault();
                    options.resetForm();
                } else if ($(target).attr('type') === 'checkbox'){
                    options.saveItemValue(target);
                }
            },
            resetForm:function(){
                backgroundPage.coolrss.resetLocalStore();
                $('form fieldset').empty();
                options.setupForm();
            },
            setupForm:function(){
                function getOps(ops){
                            if (!ops){return "";}
                            var str = "";
                            for (var name in ops){
                                if (ops.hasOwnProperty(name)){
                                    str+= name +'="'+ ops[name] +'"';
                                }
                            }
                            return str;
                        }
                function getSelectHTML(options,html){
                    for (var name in options){
                        if (options.hasOwnProperty(name)){
                            html += '<option value="'+ name +'">'+ options[name] +'</option>';
                        }
                    }
                    return html;
                }
                for (var i = 0; i<options.ops.input.length; i++){
                    var item = options.ops.input[i],
                        hidden = (item.hidden) ? "hidden" : "",
                        type = item.html5 || item.type || "text",
                        opsStr = getOps(item.ops),
                        value = options.getItemValue(item.name) || item.value || "";

                    if (item.type === "button"){
                            $('form fieldset')
                                .append('<p class="'+hidden+'"><label for="'+item.name+'">'+ item.label +'</label><input class="'+ item.className+'" '+ opsStr +' type="'+ type +'" id="'+ item.name +'" value="'+ value +'" /></p>');
                    } if (item.type === "checkbox"){
                        var checked = value === "true" || value === true ? true : false;
                        $('form fieldset')
                            .append('<p class="option '+hidden+'"><span class="option"><input type="checkbox" id="'+ item.name +'" value="'+ options.getItemValue(item.name) +'" /></span><label for="'+item.name+'">'+ item.label +'</label></p>');
                        $("#"+ item.name).prop('checked', checked );
                    } else if (item.type === "text" || item.type === "password"){
                        if (type === "range"){
                            var t = item.ops["range-type"] || "";
                            $('form fieldset')
                                .append('<p class="'+hidden+'"><label for="'+item.name+'">'+ item.label +' <span id="span'+item.name+'">'+value+'</span>'+t+'</label><input '+ opsStr +' type="'+ type +'" id="'+ item.name +'" value="'+ value +'" /></p>');
                            addRangeListener(item.name);
                        } else {
                            $('form fieldset')
                                .append('<p class="'+hidden+'"><label for="'+item.name+'">'+ item.label +'</label><input '+ opsStr +' type="'+ type +'" id="'+ item.name +'" value="'+ value +'" /></p>');
                        }
                    } else if (item.type === "title"){
                        var tag = item.tag || "h2",
                            className = item.className ? ' class="'+ item.className +'"' : "";
                        $('form fieldset')
                            .append("<"+tag + className +" class="+hidden+">"+ item.label +"</"+tag+">");
                    } else if (item.type === "select"){
                            var html = getSelectHTML(item.options,'');
                            $('form fieldset')
                                .append('<p class="'+hidden+'"><label for="'+item.name+'">'+ item.label +'</label><select '+ opsStr +' type="'+ type +'" id="'+ item.name +'">'+html+'</select></p>');
                            $('#'+ item.name).val(value);
                    } else if (item.type === "textarea"){
                        $('form fieldset')
                            .append('<p class="'+hidden+'"><label for="'+item.name+'">'+ item.label +'</label><textarea '+ opsStr +' id="'+ item.name +'">'+value+'</textarea></p>');
                    }
                }

                function addRangeListener(itmeName){
                    $('#'+itmeName).on('change',function(){
                        $('#span'+itmeName).text( $("#"+itmeName).val() );
                    });
                }
            },
            /**
             * Method, shows the correct section depending on which tab was clicked
             * @id navigate
             * @return void
             */
            navigate:function(e){
                $("section").addClass("hidden");
                $("nav li.selected").removeClass('selected');
                $(e.target.hash).removeClass("hidden");
                $(e.target).parent("li").addClass("selected");
                e.preventDefault();
            }
        };


    $(function(){
        var section = "#sectionDonate";
        if(true || backgroundPage.coolrss.getSetting("ge98AA68e8njj9") === "8977XX-PZ34"){
            section = "#sectionSettings";
        }
        $(document).on('click', "input:not(.displayonly), button:not(.displayonly)", options.handleClick);
        $(document).on('keyup', "input", options.handleKeyup);
        $(document).on('change', "select, input", options.handleValueChange);
        options.init();
        $("nav a").each(function(i,el){
            if ($(this).attr("href") === section){
                $(this).parent("li").addClass("selected");
                return false;
            }
        });
        $('nav a').on('click',options.navigate);
        $("#formDonate").on("submit",function(){
            backgroundPage.coolrss.setLocalStore("ge98AA68e8njj9","8977XX-PZ34");
        });
        $(section).removeClass("hidden");


    });
})(window.$, window.chrome, window.document, window);
