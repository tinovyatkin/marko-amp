'use strict';

const amphtmlValidator = require('amphtml-validator');
const Template = require('marko').load(
  require.resolve('./templates/amp-full-render-doc.marko'),
);

describe('Full page render and validation', () => {
  it('render and validate AMP version', async () => {
    const render = await Template.render({
      $global: {
        amp: true,
      },
    }).toString();

    expect(render).toMatchSnapshot();

    // validate
    const validator = await amphtmlValidator.getInstance();
    const result = await validator.validateString(render);
    expect(result.errors).toHaveLength(0);
    expect(result).toHaveProperty('status', 'PASS');
  });
});
