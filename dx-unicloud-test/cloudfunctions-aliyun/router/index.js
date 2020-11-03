'use strict';

exports.main = async (event, context) => {
	return await vk.router({ event, context, vk });
};
