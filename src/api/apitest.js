const params = new URLSearchParams({
  func: 'v2.instances.order.pricelist',
  out: 'json',
  lang: 'en',
  page: '1',
  page_size: '999',
  datacenter: '12,17,19,21',
});

async function test() {
  try {
    const response = await fetch(
      'https://api.zomrodev.online/v1/api/proxy/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      }
    );

    const data = await response.json();

    console.log('Status:', response.status);
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
}

test();