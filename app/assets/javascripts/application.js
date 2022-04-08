// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
// 
//= require rails-ujs
//= require jquery
//= require jquery-ui/core
//= require jquery-ui/effect
//= require jquery-ui/widgets/sortable
//= require popper
//= require bootstrap
//= require activestorage
//= require turbolinks
//= require select2.full.min
//= require i18n/ru
//= require clipboard.min
//= require jquery.cropbox
//= require jquery-clear-button
//= require ace
//= require theme-tomorrow
//= require mode-markdown
//= require ext-language_tools
//= require bootstrap-markdown-editor
//= require flipp-card
//= require flippant.min
//= require mustache.min
//= require_self
//= require_tree .

$(document).on('turbolinks:load', function() {
  $("select[data-role=select2]").each(function(i, t){
    var options = { language: "ru", theme: "bootstrap4" }
    for (var k in t.dataset) { 
      // Slim Hack: transform letter case
      switch(k) {
        case "minimumresultsforsearch":
          options["minimumResultsForSearch"] = t.dataset[k];
          break;
        case "allowclear":
          options["allowClear"] = t.dataset[k];
          break;
        default:
          options[k] = t.dataset[k];
          break;
      }

    }
    $(t).select2(options);
  });

  if(window.location.hash && window.location.hash.length > 1) {
    $("form[data-remote=true] input[name=q]").val(decodeURI(window.location.hash).slice(1));
    Rails.fire($("form[data-remote=true]").get(0), 'submit');
  }

  var dep_event = function(e) {
    var select = $(this).closest('.form-group');
    var val = parseInt($(this.id.split('_')).last()[0]);
    var next = select.nextAll();
    var selected = e.currentTarget.value;

    $.ajax({
      url: '/admin/departments',
      dataType: 'json',
      data: {"parent": selected},
      success: function(data) {
        if(selected.length > 0) {
          var insert_text = '<div class="form-group"><input type="text" name="contact[deps]['+(val + 1)+']" id="contact_deps_'+(val + 1)+'" class="form-control"></div>';
          var insert_select = '<div class="form-group"><select name="contact[deps]['+(val + 1)+']" id="contact_deps_'+(val + 1)+'" class="form-control"><option></option></select></div>';
          select.closest('.form-group').after(data.length > 0 ? insert_select : insert_text);

          var new_select = select.closest('.form-group').nextAll().first().children().first();
        
          if(data.length > 0) {
            //data.unshift({id:'', name:''});
            new_select.select2({
              language: "ru",
              theme: "bootstrap4",
              tags: true,
              data: $.map(data, function(obj) {
                obj.text = obj.name;
                return obj;
              })
            });
            new_select.on('change', dep_event);
          } else {
            new_select.on('change', dep_event);
          }
        }

        next.hide();
        next.find("select").select2("destroy");
        next.remove();
      }
    });
  }
  $("[data-event=dep_event]").on('change', dep_event);

  $("[data-action=add]").removeClass("invisible").on('click', function(e){
    e.preventDefault();

    var current = $(this).closest(".form-row.form-group");
    var count =  current.prevAll(".form-row.form-group").length;
    var add_type = $(this).attr("data-type");
    var add_model = $(this).attr("data-model");
    var add_ph = $(this).attr("data-placeholder").split('|');

    var control =
      `<div class="form-row form-group">
        <div class="col-6">
          <input type="hidden" name="`+ add_model +`[params][][type]" value="`+ add_type +`">
          <select name="`+ add_model +`[params][][name]" data-placeholder="`+ add_ph[0] +`" data-tags="true" class="form-control"><option></option></select>
        </div>
        <div class="col-6">
          <input type="text" name="`+ add_model +`[params][][value]" class="form-control" placeholder="`+ add_ph[1] +`">
        </div>
      </div>`;

    $.ajax({
      url: '/admin/params/types',
      dataType: 'json',
      data: {"type": add_type},
      success: function(data) {
        current.before(control);

        if(data.length > 0) {
          current.prevAll(".form-row.form-group").first().find("select").select2({
            language: "ru",
            theme: "bootstrap4",
            tags: true,
            data: $.map(data, function(obj) { return { 'id': obj, 'text': obj } })
          });
        }
      }});
  });

  $("[data-clipboard-text]").removeClass("invisible").on('click', function(e){ e.preventDefault(); })
  new ClipboardJS('[data-clipboard-text]');

  var submit_status = true;
  var old_query = '';
  $("form[data-remote=true]").on("ajax:beforeSend", function(e) { submit_status = false; });
  $("form[data-remote=true]").on("ajax:success", function(e) {
    [data, status, xhr] = e.detail;
    var data = JSON.parse(xhr.response);

    submit_status = true;
    old_query = data.query;
    window.location.hash = data.query;
    //if(decodeURI(window.location.hash).slice(1) != $("input[name=q]", this).val()) { window.location.hash = $("input[name=q]", this).val(); return; }
    if(data.query != $("input[name=q]", this).val()) {Rails.fire(this, 'submit'); return; }
    window.location.hash = $("input[name=q]", this).val();

    if(data.contact) {
      $('#contact_card [name=photo]').attr('src', data.contact.photo);
      $('#contact_card [name=name]').html(data.contact.name);
      $('#contact_card [name=title]').html(data.contact.title);
      $('#contact_card [name=vcard]').attr('href', `/api/v1/contacts/${data.contact.id}.vcf`);
      $('#contact_card [name=qrcode]')
        .attr('href', `/api/v1/contacts/${data.contact.id}.png`)
        .click(function(e) {
          e.preventDefault();
          $("#imgmodal").modal('show');
        });
      $("#show-img").attr('src', `/api/v1/contacts/${data.contact.id}.png`);

      $('#contact_card [name=department]').empty();
      if(data.contact.department) {
        data.contact.department.forEach((dep, index, deps) => {
          var dep_link = deps.slice(0, index + 1).reverse().join(' ');
          $(`<li class="breadcrumb-item"><a href="#${dep_link}" onclick="event.preventDefault();window.location.hash='${dep_link}';">${dep}</a></li>`).appendTo('#contact_card [name=department]');
        });
      }

      $('#contact_card [name=phone] div').empty();
      if(data.contact.params.phone) {
        data.contact.params.phone.forEach(param => {
          $(`<span class="d-flex justify-content-between flex-wrap"></span>`)
            .append(`<span class="mr-2 text-nowrap">${param.type}:</span>`)
            .append(`<a class="text-nowrap flex-fill text-right" title="${param.hint || ''}" href="${param.link}">${param.value}</a>`)
            .appendTo('#contact_card [name=phone] div');
        });
        $('#contact_card [name=phone]').removeClass('d-none');
      } else { $('#contact_card [name=phone]').addClass('d-none'); }

      $('#contact_card [name=email] div').empty();
      if(data.contact.params.email) {
        data.contact.params.email.forEach(param => {
          $(`<span class="d-flex justify-content-between flex-wrap"></span>`)
            .append(`<span class="mr-2 text-nowrap">${param.type}:</span>`)
            .append(`<a class="text-nowrap flex-fill text-right" title="${param.hint || ''}" href="${param.link}">${param.value}</a>`)
            .appendTo('#contact_card [name=email] div');
        });
        $('#contact_card [name=email]').removeClass('d-none');
      } else { $('#contact_card [name=email]').addClass('d-none'); }
      
      $('#contact_card').removeClass('d-none');
    } else { $('#contact_card').addClass('d-none'); }

    if(!data.contacts || !data.departments) { $("[data-type=contact],[data-type=department]").removeClass('hide'); return; }

    $("[data-type=contact]").each(function(i, card) {
      var id = parseInt(card.dataset.id);
      if(data.contacts.includes(id)) {
        $(card).removeClass('hide');
      } else {
        $(card).addClass('hide');
      }
    });

    $("[data-type=department]").each(function(i, dep) {
      var id = parseInt(dep.dataset.id);
      if(data.departments.includes(id) && (data.contacts.length > 1)) {
        $(dep).removeClass('hide');
      } else {
        $(dep).addClass('hide');
      }
    });
  });
  $("form[data-remote=true] input[name=q]").on("input", function(e) { if(submit_status) { Rails.fire(this.form, 'submit'); } });
  $("form[data-remote=true] input[name=favorite]").on("change", function(e) { if(submit_status) { Rails.fire(this.form, 'submit'); } });
  $("input.star[data-remote=true]").on("ajax:success", function(e) { Rails.fire($("form[data-remote=true]").get(0), 'submit'); });

  $("form[data-remote=true] input[name=q]").jQueryClearButton({
    size: 25,
    click: function(input) {Rails.fire(input.form, 'submit');}
  });

  $("[data-type=contact]").each(function(e){
    var card = this;
    $("img", this).addClass("click")
    .add($("h6", this).addClass("click"))
    .on("click", function(e) { $("form[data-remote=true] input[name=q]").val(card.dataset.name); Rails.fire($("form[data-remote=true]").get(0), 'submit'); } )
  });

  $(window).bind("hashchange", function(e) {
    console.log(decodeURI(window.location.hash).slice(1));
    //$("form[data-remote=true] input[name=q]").val(decodeURI(window.location.hash).slice(1));
    //Rails.fire($("form[data-remote=true]").get(0), 'submit');
  });

  $('textarea.markdown').markdownEditor({ 
    preview: true,
    fullscreen: false,
    //imageUpload: true,
    //uploadPath: 'upload',
    onPreview: function (content, callback) {
      $.ajax({
        url: '/help',
        type: 'POST',
        dataType: 'html',
        data: {content: content},
      })
      .done(function(result) {
        callback(result);
      });
    }
  });
  
  $( "#treeview ul" ).sortable({
    connectWith: ".ui-sortable, .ui-sortable:before",
    placeholder: ".ui-state-highlight",
    handle: 'i.move',
  }).disableSelection();

  $(document).on("change",".files input[type=file]", function() {
    var uploadFile = $(this);
    var previewFile = uploadFile.closest(".files").find('div.preview img');
    uploadFile.closest(".files").find('label').on("click", function(e) {
      if(uploadFile.hasClass('edit')) {
        e.preventDefault();  
      }
    });

    var files = !!this.files ? this.files : [];
    if (!files.length || !window.FileReader) return;
 
    if (/^image/.test( files[0].type)) {
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
 
      reader.onloadend = function() {
        previewFile.attr("src", "data:"+this.result);
        uploadFile.addClass('loaded edit');

        previewFile
          .cropbox({width: 233, height: 233, zoom: 60, label: "Откорректируйте"})
          .on('cropbox', function(e, data) {
            $('#crop_x').val(data.cropX);
            $('#crop_y').val(data.cropY);
            $('#crop_w').val(data.cropW);
            $('#crop_h').val(data.cropH);
          });
      }
    }
  });

} );