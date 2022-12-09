#### Form::RadioCard

Here is the API for the `RadioCard` component:

<Doc::ComponentApi as |C|>
  <C.Property @name="name" @type="string">
    The input control's name attribute
  </C.Property>
  <C.Property @name="value" @type="string">
    The input control's value attribute
  </C.Property>
  <C.Property @name="checked" @type="boolean">
    The input control's checked attribute
  </C.Property>
  <C.Property @name="disabled" @type="boolean">
    The input control's disabled attribute
  </C.Property>
  <C.Property @name="controlPosition" @type="enum" @value="bottom, left" @default="bottom">
    Sets the position of the form control in relation to the card content.
  </C.Property>
  <C.Property @name="alignment" @type="enum" @value="left, center" @default="left">
    Sets the alignment of the card content.
  </C.Property>
  <C.Property @name="layout" @type="string" @value="fluid, fixed" @default="fluid">
    _Notice: by default the card will expand to fit the parent container. When used in a group the cards will equally share the width to fit the available space. If the `@layout` parameter is set to `fixed` a `@maxWidth` value must be specified to constrain the card._
  </C.Property>
  <C.Property @name="maxWidth" @type="string" @value="any valid CSS width (%, vw, etc)">
    When used with a `fluid` layout, this parameter will determine the number of cards shown per row (for example `25%` will result in 4 cards). When used with a `fixed` layout, this parameter will preserve the width of the card and wrap cards on multiple rows if necessary.
  </C.Property>
  <C.Property @name="extraAriaDescribedBy" @type="string">
    An extra ID attribute to be added to the `aria-describedby` HTML attribute. _Notice: by default the `aria-describedby` attribute is automatically generated by the component, using the IDs of the helper text and errors (if they're present); use this argument if you need to pass an extra ID for specific reasons you may have._
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component. _Notice: the attributes will be applied to the `<input type="radio">` element. This means you can use all the standard HTML attributes of the `<input type="radio">` element and all the usual Ember techniques for event handling, validation, etc._ _Some examples of HTML attributes that you will likely use: `id`, `disabled` ([see whole list here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes)) and some examples of Ember modifiers: `\{{on "click" [do something]}}`, `\{{on "change" [do something]}}`._
  </C.Property>
</Doc::ComponentApi>

##### Contextual components

`Icon`, `Label`, `Badge`, `Description`, and `Generic` content are passed to the `RadioCard` as contextual components in this order, regardless of the declaration order.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[R].Icon>">
    It yields an icon inside the card container. For details about its API check the [`FlightIcon`](https://flight-hashicorp.vercel.app/engineering) component.
  </C.Property>
  <C.Property @name="<[R].Label>" @type="yielded component">
    It is a container that yields its content emphasized inside the card. `...attributes` spreading is supported on this component.
  </C.Property>
  <C.Property @name="<[R].Badge>">
    It is a badge inside the card container. For details about its API check the [`Badge`](/components/badge/) component.
  </C.Property>
  <C.Property @name="<[R].Description>" @type="yielded component">
    It is a container that yields its content inside the card. The content can be a simple string or a more complex/structured one, in which case it inherits the text style. `...attributes` spreading is supported on this component.
  </C.Property>
  <C.Property @name="<[R].Generic>" @type="yielded component">
    It is a container that yields its content inside the card. The content does not inherit any styles and can be customized as desired. `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>

#### Form::RadioCard::Group

Here is the API for the "group" component:

<Doc::ComponentApi as |C|>
  <C.Property @name="controlPosition" @type="enum" @value="bottom, left" @default="bottom">
    Sets the position of the form control in relation to the card content.
  </C.Property>
  <C.Property @name="alignment" @type="enum" @value="left, center" @default="left">
    Sets the alignment of the card content.
  </C.Property>
  <C.Property @name="name" @type="string">
    Sets the `name` attribute for each form control within the group.
  </C.Property>
  <C.Property @name="isRequired" @type="boolean">
    Appends a `Required` indicator next to the legend text and sets the `required` attribute on the controls when user input is required.
  </C.Property>
  <C.Property @name="layout" @type="string" @value="fluid, fixed" @default="fluid">
    _Notice: by default the cards will expand to fit the parent container and will equally share the width to fit the available space. If the `@layout` parameter is set to `fixed` a `@maxWidth` value must be specified for each `RadioCard` to constrain them._
  </C.Property>
</Doc::ComponentApi>

##### Contextual components

Legend, helper text, radio card, and error content are passed to the group as yielded components, using the `Legend`, `HelperText`, `RadioCard`, `Error` keys.

_Notice: the group of elements is automatically wrapped in a `<fieldset>` element._

<Doc::ComponentApi as |C|>
  <C.Property @name="<[G].Legend>" @type="yielded component">
    It is an (optional) container that yields its content inside the `<legend>` element. The content can be a simple string, or a more complex/structured one (in which case it inherits the text style). For details about its API check the [`Form::Legend`](/components/form/base-elements/) component.
  </C.Property>
  <C.Property @name="<[G].HelperText>" @type="yielded component">
    It is a container that yields its content inside the "helper text" block (at group level). The content can be a simple string, or a more complex/structured one (in which case it inherits the text style). For details about its API check the [`Form::HelperText`](/components/form/base-elements/) component. _Notice: the `id` attribute of the element is automatically generated._
  </C.Property>
  <C.Property @name="<[G].RadioCard>" @type="yielded component">
    It is used to yield one or more cards inside the group. For details about its API check the `RadioCard` component above.
  </C.Property>
  <C.Property @name="<[G].Error>" @type="yielded component">
    It is a container that yields its content inside the "error" block (at group level). The content can be a simple string, or a more complex/structured one (in which case it inherits the text style). For details about its API check the [`Form::Error`](/components/form/base-elements/) component. _Notice: the `id` attribute of the `Error` element is automatically generated._
  </C.Property>
  <C.Property @name="<[E].Message>" @type="yielded component">
    If the error is made of multiple messages, you can iterate over a collection of error messages yielding individual items using `Error.Message`.
  </C.Property>
</Doc::ComponentApi>