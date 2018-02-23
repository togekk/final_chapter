declare var require: any;
import { Component } from '@angular/core';
import b4w from "blend4web";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  mod: any;

  constructor() {

    this.go();
  }

  go() {
    const MyCode = require("./mouse_event.js");
    MyCode().then(Module => {
      b4w.register("final_chapter_main", function (exports, require) {

        // import modules used by the app
        const m_app = require("app");
        const m_cfg = require("config");
        const m_data = require("data");
        const m_preloader = require("preloader");
        const m_ver = require("version");
        const lights = require("lights");
        const m_mouse = require("mouse");
        const m_cam = require("camera");
        const m_scenes = require("scenes");

        const DEBUG = false;

        // set the path to assets
        const APP_ASSETS_PATH = "assets/";
        // set the path to physics engine
        m_cfg.set("physics_uranium_path", "node_modules/blend4web/dist/uranium/")

        let canvas_e;

        /**
         * export the method to initialize the app (called at the bottom of this file)
         */
        exports.init = init;
        function init() {
          m_app.init({
            canvas_container_id: "main_canvas_container",
            callback: init_cb,
            show_fps: DEBUG,
            console_verbose: DEBUG,
            autoresize: true,
            quality: m_cfg.P_AUTO
          });
        }

        /**
         * callback executed when the app is initialized 
         */
        function init_cb(canvas_elem, success) {

          if (!success) {
            console.log("b4w init failure");
            return;
          }

          m_preloader.create_preloader();

          // ignore right-click on the canvas element
          canvas_elem.oncontextmenu = function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          };

          canvas_e = canvas_elem;

          load();
        }

        /**
         * load the scene data
         */
        function load() {
          m_data.load(APP_ASSETS_PATH + "final_chapter.json", load_cb, preloader_cb);
        }

        /**
         * update the app's preloader
         */
        function preloader_cb(percentage) {
          m_preloader.update_preloader(percentage);
        }

        /**
         * callback executed when the scene data is loaded
         */
        function load_cb(data_id, success) {

          if (!success) {
            console.log("b4w load failure");
            return;
          }

          m_app.enable_camera_controls();

          // place your code here

          lights.set_day_time(18.2);

          const cam_org_pos = new Float64Array([7.725669860839844, -1.0204399824142456, 1.8238799571990967]);


          canvas_e.oncontextmenu = function (e) {
            e.preventDefault();
            e.stopPropagation();
            m_cam.translate_view(camera, 0, 0, 0);
            m_cam.set_translation(camera, cam_org_pos);
            return false;
          };

          const camera = m_scenes.get_active_camera();

          function mouseMove(event) {
            // console.log(Module._translate_x(m_mouse.get_coords_x(event), canvas_e.width));
            m_cam.translate_view(camera, Module._translate_x(m_mouse.get_coords_x(event), canvas_e.width), Module._translate_y(m_mouse.get_coords_y(event), canvas_e.height), 0);
          }

          canvas_e.addEventListener("mousemove", mouseMove);

          canvas_e.addEventListener("mousedown", function (event) {
            canvas_e.removeEventListener("mousemove", mouseMove);
          });

          canvas_e.addEventListener("mouseup", function (event) {
            canvas_e.addEventListener("mousemove", mouseMove);
          });
        }


      });
      b4w.require("final_chapter_main").init();

    });

  }

}