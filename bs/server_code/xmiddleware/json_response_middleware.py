import json
from django.http import JsonResponse


class JsonResponseMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        # 如果返回的是JsonResponse，直接返回
        if isinstance(response, JsonResponse):
            if "/baidu/" in request.get_full_path():
                return response
            response = convert_keys_to_camel_case(json.loads(response.content.decode('utf-8')))
            print("response:", response)
            return JsonResponse(response)
        return response

def to_camel_case(snake_str):
    components = snake_str.split('_')
    # 将第一个元素小写，其余元素首字母大写
    return components[0] + ''.join(x.title() for x in components[1:])

def convert_keys_to_camel_case(data):
    if isinstance(data, dict):
        new_data = {}
        for key, value in data.items():
            new_key = to_camel_case(key)
            if value is None or value == 'None':
                new_data[new_key] = ""
            else:
                new_data[new_key] = convert_keys_to_camel_case(value)
        return new_data
    elif isinstance(data, list):
        return [convert_keys_to_camel_case(item) for item in data]
    else:
        return data


