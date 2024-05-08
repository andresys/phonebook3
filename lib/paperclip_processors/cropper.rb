module Paperclip
  class Cropper < Thumbnail
    def transformation_command
      if crop_geometry
        scale, crop = @current_geometry.transformation_to(@target_geometry, crop?)
        trans = []
        trans << "-coalesce" if animated?
        trans << "-auto-orient" if auto_orient
        trans << "-crop" << %["#{crop_geometry}"] << "+repage"
        trans << "-resize" << %["#{scale}"] unless scale.nil? || scale.empty?
        trans << '-layers "optimize"' if animated?
        trans
      else
        super
      end
    end

  private

    def crop_geometry
      target = @attachment.instance
      if target.cropping?
        "#{target.crop_w.to_i}x#{target.crop_h.to_i}+#{target.crop_x.to_i}+#{target.crop_y.to_i}"
      end
    end
  end
end