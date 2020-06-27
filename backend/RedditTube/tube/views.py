from django.shortcuts import render

# Create your views here.+
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
import urllib

def getUrls(request):
    if request.method == 'POST':
        urlObj = JSONParser().parse(request);
        url = urlObj['url'];
        urllib.urlretrieve(url, "t3.html")