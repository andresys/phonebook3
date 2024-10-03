// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import { Application } from "@hotwired/stimulus"
import { Turbo } from "@hotwired/turbo-rails"

import EntriesController from './controllers/entries_controller'
import LazyLoaderController from './controllers/lazy_loader_controller'
import SearchController from './controllers/search_controller'
import ClipboardController from '@stimulus-components/clipboard'
import SortableController from '@stimulus-components/sortable'
import NestedSortableController from './controllers/nested_sortable_controller'
import DropdownController from './controllers/dropdown_controller'
import TabsController from './controllers/tabs_controller'
import StreamController from './controllers/stream_controller'
import ContactController from './controllers/contact_controller'
import DepartmentController from './controllers/department_controller'
import RailsNestedForm from '@stimulus-components/rails-nested-form'
import PasswordVisibility from '@stimulus-components/password-visibility'
import TextareaAutogrow from 'stimulus-textarea-autogrow'
import CropController from './controllers/crop_controller'
import ImagePreviewController from './controllers/image_preview_controller'
import TomSelectController from './controllers/tom_select_controller'
import { Autocomplete } from 'stimulus-autocomplete'

Turbo.session.drive = false
window.Stimulus = Application.start()

Stimulus.register('entries', EntriesController)
Stimulus.register('lazy-loader', LazyLoaderController)
Stimulus.register('search', SearchController)
Stimulus.register('clipboard', ClipboardController)
Stimulus.register('sortable', SortableController)
Stimulus.register('nested-sortable', NestedSortableController)
Stimulus.register('dropdown', DropdownController)
Stimulus.register('tabs', TabsController)
Stimulus.register('stream', StreamController)
Stimulus.register('contact', ContactController)
Stimulus.register('department', DepartmentController)
Stimulus.register('nested-form', RailsNestedForm)
Stimulus.register('password-visibility', PasswordVisibility)
Stimulus.register('textarea-autogrow', TextareaAutogrow)
Stimulus.register('crop', CropController)
Stimulus.register('image-preview', ImagePreviewController)
Stimulus.register('tom-select', TomSelectController)
Stimulus.register('autocomplete', Autocomplete)